package api

import (
	"github.com/gin-gonic/gin"
)

func NewRouter() *gin.Engine {
	// Set up gin
	r := gin.Default()

	//// Redirect to angular site from site root
	//r.GET("/", func(c *gin.Context) {
	//	location := url.URL{Path: "/app"}
	//	c.Redirect(http.StatusFound, location.RequestURI())
	//})

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

	//// Angular site
	//r.Static("/app", config.Pixie.Paths.WebRoot)
	//r.NoRoute(func(c *gin.Context) {
	//	fmt.Println("Route not found for:", c.Request.RequestURI)
	//	if strings.HasPrefix(c.Request.RequestURI, "/app") {
	//		c.File(filepath.Join(config.Pixie.Paths.WebRoot, "index.html"))
	//	}
	//})

	return r
}
