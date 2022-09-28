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
		devices := v1.Group("devices")
		{
			devices.GET("/", api.GetAllDevicesHandler)
			devices.POST("/", api.AddDeviceHandler)
			devices.GET("/:id", api.GetAllDevicesHandler)
			devices.PUT("/:id", api.UpdateDeviceHandler)
			devices.DELETE("/:id", api.DeleteDeviceHandler)
			devices.GET("/boot", handlers.BootHandler)
		}

		files := v1.Group("files")
		{
			files.GET("/", api.GetAllFilesHandler)
			files.POST("/", api.AddFileHandler)
			files.GET("/:id", api.GetAllFilesHandler)
			files.PUT("/:id", api.UpdateFileHandler)
			files.DELETE("/:id", api.DeleteFileHandler)
			files.POST("/:id/upload", api.UploadFileHandler)
			files.POST("/:id/sync", api.SyncFilesHandler)
		}

		logs := v1.Group("logs")
		{
			logs.GET("/", api.GetLogsHandler)
		}
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
