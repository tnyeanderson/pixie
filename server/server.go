package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tnyeanderson/ipxe-hub/config"
	"github.com/tnyeanderson/ipxe-hub/handlers"
	"github.com/tnyeanderson/ipxe-hub/handlers/api"
)

func Init() {
	// Set up gin
	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"data": "hello world"})
	})

	// API
	r.GET(config.ApiBasePath+"/devices", api.GetAllDevicesHandler)
	r.GET(config.ApiBasePath+"/devices/mac/:mac", api.GetDeviceByMacHandler)
	r.POST(config.ApiBasePath+"/devices/add", api.AddDeviceHandler)
	r.POST(config.ApiBasePath+"/devices/update/:id", api.UpdateDeviceHandler)
	r.DELETE(config.ApiBasePath+"/devices/delete/:id", api.DeleteDeviceHandler)
	r.GET(config.ApiBasePath+"/scripts", api.GetAllScriptsHandler)
	r.GET(config.ApiBasePath+"/scripts/default", api.GetDefaultScriptHandler)
	r.POST(config.ApiBasePath+"/scripts/add", api.AddScriptHandler)
	r.POST(config.ApiBasePath+"/scripts/update/:id", api.UpdateScriptHandler)
	r.DELETE(config.ApiBasePath+"/scripts/delete/:id", api.DeleteScriptHandler)

	// File uploads
	r.PUT(config.ApiBasePath+"/upload/image", api.UploadImageHandler)
	r.PUT(config.ApiBasePath+"/upload/script", api.UploadScriptHandler)

	// Boot script handler
	r.GET("/boot.ipxe", handlers.BootHandler)

	// File server
	r.Static("/files", config.BaseFilesPath)

	r.Static("/app", config.WebRootPath)

	r.Run(":8880")

}
