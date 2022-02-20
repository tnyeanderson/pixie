package main

import (
	"net/http"

	"github.com/tnyeanderson/ipxe-hub/config"
	"github.com/tnyeanderson/ipxe-hub/db"
	"github.com/tnyeanderson/ipxe-hub/handlers"
	"github.com/tnyeanderson/ipxe-hub/handlers/api"
)

func main() {
	// Initialize
	db.Init()

	// File server
	http.Handle("/files/", http.StripPrefix("/files/", http.FileServer(http.Dir("files"))))

	// Boot script handler
	http.HandleFunc("/boot.ipxe", handlers.BootHandler)

	// API
	http.HandleFunc(config.ApiBasePath+"/devices", api.GetAllDevicesHandler)
	http.HandleFunc(config.ApiBasePath+"/devices/add", api.AddDeviceHandler)
	http.HandleFunc(config.ApiBasePath+"/devices/update", api.UpdateDeviceHandler)
	http.HandleFunc(config.ApiBasePath+"/scripts", api.GetAllScriptsHandler)
	http.HandleFunc(config.ApiBasePath+"/scripts/add", api.AddScriptHandler)

	print("Listening")
	http.ListenAndServe(":8880", nil)
}
