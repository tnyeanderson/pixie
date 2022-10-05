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

	// Redirect to angular site from site root
	r.GET("/", func(c *gin.Context) {
		location := url.URL{Path: "/app"}
		c.Redirect(http.StatusFound, location.RequestURI())
	})

	// API
	// Default base path: /api/v1
	v1 := r.Group(config.Pixie.Paths.Api)
	{
		// devices
		v1.GET("/devices", api.GetAllDevicesHandler)
		v1.POST("/devices", api.AddDeviceHandler)
		v1.GET("/devices/:id", api.GetAllDevicesHandler)
		v1.PUT("/devices/:id", api.UpdateDeviceHandler)
		v1.DELETE("/devices/:id", api.DeleteDeviceHandler)
		v1.GET("/devices/boot", api.BootHandler)

		// files
		v1.GET("/files", api.GetAllFilesHandler)
		v1.POST("/files", api.AddFileHandler)
		v1.POST("/files/sync", api.SyncFilesHandler)
		v1.GET("/files/:id", api.GetAllFilesHandler)
		v1.PUT("/files/:id", api.UpdateFileHandler)
		v1.DELETE("/files/:id", api.DeleteFileHandler)
		v1.POST("/files/:id/upload", api.UploadFileHandler)

		// boot configs
		v1.GET("/boot-configs", api.GetAllBootConfigsHandler)
		v1.POST("/boot-configs", api.AddBootConfigHandler)
		v1.GET("/boot-configs/:id", api.GetAllBootConfigsHandler)
		v1.PUT("/boot-configs/:id", api.UpdateBootConfigHandler)
		v1.DELETE("/boot-configs/:id", api.DeleteBootConfigHandler)

		// logs
		v1.GET("/logs", api.GetLogsHandler)
	}

	// File server
	r.GET("/static/*path", handlers.StaticHandler)

	// Angular site
	r.Static("/app", config.Pixie.Paths.WebRoot)
	r.NoRoute(func(c *gin.Context) {
		fmt.Println("Route not found for:", c.Request.RequestURI)
		if strings.HasPrefix(c.Request.RequestURI, "/app") {
			c.File(filepath.Join(config.Pixie.Paths.WebRoot, "index.html"))
		}
	})

	r.Run(":8880")

}
