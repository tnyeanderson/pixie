package main

import (
	"os"
	"sync"

	"github.com/tnyeanderson/ipxe-hub/config"
	"github.com/tnyeanderson/ipxe-hub/db"
	"github.com/tnyeanderson/ipxe-hub/server"
)

func setupDirectories() {
	dirs := []string{
		config.BaseDataPath,
		config.BaseFilesPath,
		config.BaseImagesPath,
		config.BaseScriptsPath,
	}
	for _, dir := range dirs {
		_ = os.Mkdir(dir, config.DefaultDirMode)
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
