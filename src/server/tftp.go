package server

import (
	"errors"
	"fmt"
	"io"
	"os"
	"path"
	"strings"

	"github.com/pin/tftp"
	"github.com/tnyeanderson/pixie/config"
	"github.com/tnyeanderson/pixie/db/queries"
)

// readHandler is called when client starts file download from server
func readHandler(filename string, rf io.ReaderFrom) error {
	fmt.Printf("TFTP get: %s\n", filename)
	if filename == "pixie.kpxe" {
		// For compatibility reasons, allow loading pixie.kpxe from the root path
		filename = path.Join(config.Pixie.Paths.FileServer, filename)
	}
	if !strings.HasPrefix(filename, config.Pixie.Paths.FileServer) {
		return errors.New("Path must begin with " + config.Pixie.Paths.FileServer)
	}
	// TODO: This should add the FileServer prefix, skip the above check
	file, err := os.Open(filename)
	if err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
		return err
	}
	n, err := rf.ReadFrom(file)
	if err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
		return err
	}
	fmt.Printf("%d bytes sent\n", n)
	queries.LogLastAccessed(filename)
	return nil
}

// writeHandler is called when client starts file upload to server
func writeHandler(filename string, wt io.WriterTo) error {
	if !strings.HasPrefix(filename, config.Pixie.Paths.FileServer) {
		return errors.New("Path must begin with " + config.Pixie.Paths.FileServer)
	}
	file, err := os.OpenFile(filename, os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0644)
	if err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
		return err
	}
	n, err := wt.WriteTo(file)
	if err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
		return err
	}
	fmt.Printf("%d bytes received\n", n)
	return nil
}

func ListenTFTP() {
	s := tftp.NewServer(readHandler, writeHandler)
	err := s.ListenAndServe(":69") // blocks until s.Shutdown() is called
	if err != nil {
		fmt.Fprintf(os.Stdout, "server: %v\n", err)
		os.Exit(1)
	}
}
