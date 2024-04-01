package pixie

import (
	"errors"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"os"
	"path"
	"strings"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/pin/tftp"
)

const (
	DefaultHTTPListener = ":8880"
	DefaultTFTPListener = ":69"
)

// Server is a pixie server configuration.
type Server struct {
	Boots        []Boot
	StaticRoot   string
	HTTPListener string
	TFTPListener string
}

// Listen starts an HTTP server (for the API) and a TFTP server, and blocks
// until either of them exit.
func (s *Server) Listen() error {
	// If any exits, end the program
	wg := sync.WaitGroup{}
	wg.Add(1)

	var out error

	go func() {
		slog.Info("starting HTTP server")
		if err := s.listenHTTP(); err != nil {
			out = err
		}
		wg.Done()
	}()

	go func() {
		slog.Info("starting TFTP server")
		if err := s.listenTFTP(); err != nil {
			out = err
		}
		wg.Done()
	}()

	wg.Wait()
	return out
}

// RenderScript will render the script associated with the provided MAC address
// using [text/template].  [Device.Vars] will be merged with [Boot.Vars] at the
// Boot level. [Device.Vars] values have precedent.
func (s *Server) RenderScript(mac string) (string, error) {
	boot, device := s.getBootAndDevice(mac)
	if boot == nil {
		return "", fmt.Errorf("mac address not found in configured boots/devices: %s", mac)
	}

	subpath := boot.Script
	if subpath == "" {
		return "", fmt.Errorf("script not set for mac: %s", mac)
	}
	fullpath := path.Join(s.StaticRoot, subpath)

	return boot.renderFile(fullpath, device)
}

func (s *Server) listenHTTP() error {
	// Set up gin
	r := gin.Default()

	// API
	// Default base path: /api/v1
	v1 := r.Group("/api/v1")

	// Always get the config for api calls
	v1.Use()

	v1.GET("/device/boot", s.bootHandler())

	// File server
	r.GET("/static/*path", s.staticHandler())

	// Renderer
	r.GET("/render/:mac/*path", s.staticHandler())

	// Start the server
	return r.Run(s.getHTTPListener())
}

func (s *Server) getTFTPListener() string {
	if s.TFTPListener == "" {
		return DefaultTFTPListener
	}
	return s.TFTPListener
}

func (s *Server) getHTTPListener() string {
	if s.HTTPListener == "" {
		return DefaultHTTPListener
	}
	return s.HTTPListener
}

func (s *Server) listenTFTP() error {
	t := tftp.NewServer(s.tftpReadHandler(), s.tftpWriteHandler())
	return t.ListenAndServe(s.getTFTPListener()) // blocks until s.Shutdown() is called
}

func (s *Server) tftpReadHandler() func(filename string, rf io.ReaderFrom) error {
	return func(filename string, rf io.ReaderFrom) error {
		slog.Info("getting file with TFTP", "name", filename)
		staticRoot := s.StaticRoot
		if filename == "pixie.kpxe" {
			// For compatibility reasons, allow loading pixie.kpxe from the root path
			filename = path.Join(staticRoot, filename)
		}
		if !strings.HasPrefix(filename, staticRoot) {
			return errors.New("Path must begin with " + staticRoot)
		}
		// TODO: This should add the FileServer prefix, skip the above check
		file, err := os.Open(filename)
		if err != nil {
			slog.Error(err.Error())
			return err
		}
		n, err := rf.ReadFrom(file)
		if err != nil {
			slog.Error(err.Error())
			return err
		}
		slog.Info("completed TFTP transfer", "sent", n)
		return nil
	}
}

func (s *Server) tftpWriteHandler() func(filename string, wt io.WriterTo) error {
	return func(filename string, wt io.WriterTo) error {
		staticRoot := s.StaticRoot
		if !strings.HasPrefix(filename, staticRoot) {
			return errors.New("Path must begin with " + staticRoot)
		}
		file, err := os.OpenFile(filename, os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0644)
		if err != nil {
			slog.Error(err.Error())
			return err
		}
		n, err := wt.WriteTo(file)
		if err != nil {
			slog.Error(err.Error())
			return err
		}
		slog.Info("completed TFTP transfer", "received", n)
		return nil
	}
}

func (s *Server) getBootAndDevice(mac string) (*Boot, *Device) {
	if s.Boots != nil {
		for _, boot := range s.Boots {
			if boot.Devices != nil {
				for _, device := range boot.Devices {
					if device.Mac == mac {
						return &boot, &device
					}
				}
			}
		}
	}
	return nil, nil
}

func (s *Server) bootHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		mac := c.Query("mac")

		mac, err := sanitizeMac(mac)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid MAC address"})
			return
		}

		s, err := s.RenderScript(mac)
		if err != nil {
			slog.Error(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to render boot script."})
			return
		}

		c.String(http.StatusOK, "%s", s)
	}
}

func (s *Server) staticHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		mac := c.Param("mac")
		subpath := c.Param("path")

		fullpath := path.Join(s.StaticRoot, subpath)

		if mac == "" {
			// Render the file normally
			c.File(fullpath)
			return
		}

		// Render the file as a template

		mac, err := sanitizeMac(mac)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid MAC address"})
			return
		}

		b, d := s.getBootAndDevice(mac)
		if d == nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "device not found"})
			return
		}

		s, err := b.renderFile(fullpath, d)
		if err != nil {
			slog.Error(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to render file."})
			return
		}

		c.String(http.StatusOK, "%s", s)
		return
	}
}
