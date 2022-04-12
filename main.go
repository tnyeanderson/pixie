package main

import (
	"io/fs"
	"os"
	"path/filepath"
	"sync"

	"github.com/tnyeanderson/pixie/config"
	"github.com/tnyeanderson/pixie/db"
	"github.com/tnyeanderson/pixie/server"
)

func setupDirectories() {
	dirs := []string{
		filepath.Dir(config.Pixie.Paths.Database),
		config.Pixie.Paths.FileServer,
		config.Pixie.Paths.Images,
		config.Pixie.Paths.Scripts,
	}
	for _, dir := range dirs {
		_ = os.Mkdir(dir, fs.FileMode(config.Pixie.AccessModes.DirDefault))
	}
}

func start() {
	wg := new(sync.WaitGroup)
	wg.Add(2)

	go func() {
		server.ListenHTTP()
		wg.Done()
	}()

	go func() {
		server.ListenTFTP()
		wg.Done()
	}()

	wg.Wait()
}

func main() {
	setupDirectories()

	db.Initialize()

	start()
}
