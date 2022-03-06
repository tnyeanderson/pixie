package server

import (
	"net/http"
	"net/url"

	"github.com/gin-gonic/gin"
	"github.com/tnyeanderson/ipxe-hub/config"
	"github.com/tnyeanderson/ipxe-hub/handlers"
	"github.com/tnyeanderson/ipxe-hub/handlers/api"
)

func ListenHTTP() {
	// Set up gin
	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		location := url.URL{Path: "/app"}
		c.Redirect(http.StatusFound, location.RequestURI())
	})

	// API
	v1 := r.Group(config.ApiBasePath)
	{
		devices := v1.Group("devices")
		{
			devices.GET("/", api.GetAllDevicesHandler)
			devices.GET("/mac/:mac", api.GetDeviceByMacHandler)
			devices.POST("/add", api.AddDeviceHandler)
			devices.POST("/update/:id", api.UpdateDeviceHandler)
			devices.DELETE("/delete/:id", api.DeleteDeviceHandler)
		}

		scripts := v1.Group("scripts")
		{
			scripts.GET("/", api.GetAllScriptsHandler)
			scripts.GET("/default", api.GetDefaultScriptHandler)
			scripts.POST("/add", api.AddScriptHandler)
			scripts.POST("/update/:id", api.UpdateScriptHandler)
			scripts.DELETE("/delete/:id", api.DeleteScriptHandler)

		}

		upload := v1.Group("upload")
		{
			upload.PUT("/image", api.UploadImageHandler)
			upload.PUT("/script", api.UploadScriptHandler)

		}
	}

	// Boot script handler
	r.GET("/boot.ipxe", handlers.BootHandler)

	// File server
	r.Static("/files", config.BaseFilesPath)

	// Angular site
	r.Static("/app", config.WebRootPath)

	r.Run(":8880")

}
