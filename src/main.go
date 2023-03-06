package main

import (
	"os"
	"sync"

	"github.com/tnyeanderson/pixie/api"
	"github.com/tnyeanderson/pixie/server"
)

//func setupDirectories() {
//	dirs := []string{
//		filepath.Dir(config.Pixie.Paths.Database),
//		config.Pixie.Paths.FileServer,
//	}
//	for _, dir := range dirs {
//		_ = os.Mkdir(dir, fs.FileMode(config.Pixie.AccessModes.DirDefault))
//	}
//}

func start() {
	wg := new(sync.WaitGroup)
	wg.Add(2)

	go func() {
		server.ListenHTTP()
		wg.Done()
	}()

	go func() {
		//server.ListenTFTP()
		wg.Done()
	}()

	wg.Wait()
}

func main() {
	api.ConfigPath = os.Args[1]
	start()
}
