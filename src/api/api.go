package api

import (
	"github.com/gin-gonic/gin"
)

func NewRouter() *gin.Engine {
	// Set up gin
	r := gin.Default()

	// API
	// Default base path: /api/v1
	v1 := r.Group("/api/v1")

	// Always get the config for api calls
	v1.Use(GetConfig)

	v1.GET("/device/boot", BootHandler)

	//// logs
	//v1.GET("/logs", api.GetLogsHandler)

	// File server
	r.GET("/static/*path", GetConfig, StaticHandler)

	// Renderer
	r.GET("/render/:mac/*path", GetConfig, StaticHandler)

	return r
}
