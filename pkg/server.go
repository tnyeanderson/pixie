package pixie

import (
	_ "embed"
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
	sloggin "github.com/samber/slog-gin"
)

//go:embed defaults/shell.ipxe
var defaultScript string

//go:embed defaults/passthrough.ipxe
var passthroughScript string

const (
	DefaultAPIListener  = ":443"
	DefaultTFTPListener = ":69"
)

// Server is a pixie server configuration.
type Server struct {
	AdminAPIKey     string
	PassthroughMode bool
	StaticRoot      string

	APIListener  string
	TFTPListener string
	TLSCertPath  string
	TLSKeyPath   string

	Boots []Boot
	Vars  map[string]string

	// skipPassthrough is a map of MAC addresses which will not passthrough on
	// next boot. Only considered when passthroughmode=true. Key existence is all
	// that matters (for efficiency reasons), the boolean value is a no-op. Key
	// will be deleted on next boot.
	skipPassthrough map[string]bool
}

// Listen starts an API server and a TFTP server, and blocks until either of
// them exit.
func (s *Server) Listen() error {
	// If any exits, end the program
	wg := sync.WaitGroup{}
	wg.Add(1)

	var out error

	go func() {
		slog.Info("starting API server")
		if err := s.listenAPI(); err != nil {
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
// using [text/template]. A [RenderConfig] is created and used when rendering
// the template.
func (s *Server) RenderScript(mac string) (string, error) {
	rc, err := s.NewRenderConfig(mac)
	if err != nil {
		slog.Error(fmt.Sprintf("device not configured in pixie, using default script: %s", mac))
		return defaultScript, nil
	}

	// Boot from inline Script
	if len(rc.Boot.Script) > 0 {
		return rc.Render([]byte(rc.Boot.Script))
	}

	// Boot from ScriptPath
	subpath := rc.Boot.ScriptPath
	if subpath == "" {
		slog.Error(fmt.Sprintf("script not set for mac, using default script: %s", mac))
		return defaultScript, nil
	}
	fullpath := path.Join(s.StaticRoot, subpath)

	b, err := os.ReadFile(fullpath)
	if err != nil {
		return "", err
	}

	return rc.Render(b)
}

// NewRenderConfig will return a [RenderConfig] for the boot/device associated
// with the given MAC address.
func (s *Server) NewRenderConfig(mac string) (*RenderConfig, error) {
	b, d := s.getBootAndDevice(mac)
	if b == nil {
		return nil, fmt.Errorf("no boot defined for mac: %s", mac)
	}
	return NewRenderConfig(s.Vars, b, d), nil
}

func (s *Server) listenAPI() error {
	if s.TLSCertPath == "" || s.TLSKeyPath == "" {
		return fmt.Errorf("must provide a TLS certificate")
	}

	gin.SetMode(gin.ReleaseMode)

	// Set up gin
	r := gin.New()
	r.Use(sloggin.New(slog.Default()))
	r.Use(gin.Recovery())

	// Get static file contents
	r.GET("/static/*path", s.staticHandler())

	// Render template file
	r.GET("/render/:mac/*path", sanitizeMacParam, s.renderHandler())

	// Render the boot script for a device
	r.GET("/boot/:mac", sanitizeMacParam, s.passthroughBootHandler(), s.bootHandler())

	// Subpath /admin is always authenticated
	admin := r.Group("/admin")
	admin.Use(s.auth())

	// Set a device to skip passthrough on next boot
	admin.POST("/device/:mac/passthrough/skip", s.skipPassthroughHandler())

	listener := s.APIListener
	if listener == "" {
		listener = DefaultAPIListener
	}

	// Start the server
	return r.RunTLS(listener, s.TLSCertPath, s.TLSKeyPath)
}

func (s *Server) listenTFTP() error {
	listener := s.TFTPListener
	if listener == "" {
		listener = DefaultTFTPListener
	}
	t := tftp.NewServer(s.tftpReadHandler(), s.tftpWriteHandler())
	return t.ListenAndServe(listener)
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
			return errors.New("path must begin with " + staticRoot)
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
			return errors.New("path must begin with " + staticRoot)
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

func (s *Server) passthroughBootHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if !s.PassthroughMode {
			return
		}

		mac := c.GetString("mac")
		if _, ok := s.skipPassthrough[mac]; !ok {
			slog.Info("passing through to next boot device", "mac", mac)
			c.String(http.StatusOK, passthroughScript)
			c.Abort()
			return
		}

		slog.Info("next boot activated", "mac", mac)
		delete(s.skipPassthrough, mac)
	}
}

func (s *Server) bootHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		mac := c.GetString("mac")
		script, err := s.RenderScript(mac)
		if err != nil {
			slog.Error(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to render boot script."})
			return
		}
		c.String(http.StatusOK, "%s", script)
	}
}

func (s *Server) staticHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		subpath := c.Param("path")
		fullpath := path.Join(s.StaticRoot, subpath)
		c.File(fullpath)
	}
}

func (s *Server) renderHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		mac := c.GetString("mac")

		rc, err := s.NewRenderConfig(mac)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "device not found"})
			return
		}

		subpath := c.Param("path")
		fullpath := path.Join(s.StaticRoot, subpath)
		b, err := os.ReadFile(fullpath)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("file not found: %s", fullpath)})
			return
		}

		out, err := rc.Render(b)
		if err != nil {
			slog.Error(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to render file."})
			return
		}

		c.String(http.StatusOK, "%s", out)
	}
}

func (s *Server) skipPassthroughHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if !s.PassthroughMode {
			c.JSON(http.StatusBadRequest, gin.H{"error": "passthrough mode not enabled"})
			return
		}

		mac := c.GetString("mac")
		if s.skipPassthrough == nil {
			s.skipPassthrough = map[string]bool{}
		}
		s.skipPassthrough[mac] = true
	}
}

func (s *Server) auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.AdminAPIKey == "" {
			return
		}
		token := strings.TrimPrefix(c.Request.Header.Get("Authorization"), "Bearer ")
		if token != s.AdminAPIKey {
			c.JSON(http.StatusUnauthorized, gin.H{})
			c.Abort()
			return
		}
	}
}

func sanitizeMacParam(c *gin.Context) {
	mac, err := sanitizeMac(c.Param("mac"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid MAC address"})
		c.Abort()
		return
	}
	c.Set("mac", mac)
}
