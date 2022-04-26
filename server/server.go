package server

import (
	"fmt"
	"net/http"
	"net/url"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/tnyeanderson/pixie/config"
	"github.com/tnyeanderson/pixie/handlers"
	"github.com/tnyeanderson/pixie/handlers/api"
)

func ListenHTTP() {
	// Set up gin
	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		location := url.URL{Path: "/app"}
		c.Redirect(http.StatusFound, location.RequestURI())
	})

	// API
	v1 := r.Group(config.Pixie.Paths.Api)
	{
		cloudconfigs := v1.Group("cloudconfigs")
		{
			cloudconfigs.GET("/", api.GetAllCloudConfigsHandler)
			cloudconfigs.POST("/add", api.AddCloudConfigHandler)
			cloudconfigs.POST("/update/:id", api.UpdateCloudConfigHandler)
			cloudconfigs.DELETE("/delete/:id", api.DeleteCloudConfigHandler)
			cloudconfigs.POST("/sync", api.SyncCloudConfigsHandler)
		}

		devices := v1.Group("devices")
		{
			devices.GET("/", api.GetAllDevicesHandler)
			devices.GET("/mac/:mac", api.GetDeviceByMacHandler)
			devices.POST("/add", api.AddDeviceHandler)
			devices.POST("/update/:id", api.UpdateDeviceHandler)
			devices.DELETE("/delete/:id", api.DeleteDeviceHandler)
		}

		images := v1.Group("images")
		{
			images.GET("/", api.GetAllImagesHandler)
			images.GET("/default", api.GetDefaultImageHandler)
			images.POST("/add", api.AddImageHandler)
			images.POST("/update/:id", api.UpdateImageHandler)
			images.DELETE("/delete/:id", api.DeleteImageHandler)
			images.POST("/sync", api.SyncImagesHandler)
		}

		scripts := v1.Group("scripts")
		{
			scripts.GET("/", api.GetAllScriptsHandler)
			scripts.GET("/default", api.GetDefaultScriptHandler)
			scripts.POST("/add", api.AddScriptHandler)
			scripts.POST("/update/:id", api.UpdateScriptHandler)
			scripts.DELETE("/delete/:id", api.DeleteScriptHandler)
			scripts.POST("/sync", api.SyncScriptsHandler)
		}

		upload := v1.Group("upload")
		{
			upload.PUT("/image", api.UploadImageHandler)
			upload.PUT("/script", api.UploadScriptHandler)

		}

		logs := v1.Group("logs")
		{
			logs.GET("/", api.GetLogsHandler)
		}
	}

	// Boot script handler
	r.GET("/boot.ipxe", handlers.BootHandler)

	// File server
	r.GET("/files/*path", handlers.StaticHandler)

	// Angular site
	r.Static("/app", config.Pixie.Paths.WebRoot)
	r.NoRoute(func(c *gin.Context) {
		fmt.Println("Route not found for: %s", c.Request.RequestURI)
		if strings.HasPrefix(c.Request.RequestURI, "/app") {
			c.File(filepath.Join(config.Pixie.Paths.WebRoot, "index.html"))
		}
	})

	r.Run(":8880")

}
