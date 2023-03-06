package api

import (
	"net/http"
	"path"

	"github.com/gin-gonic/gin"
	"github.com/tnyeanderson/pixie/config"
)

func StaticHandler(c *gin.Context) {
	subpath := c.Param("path")
	conf := config.Config{}
	if err := conf.Load(ConfigPath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load config"})
		return
	}
	fullpath := path.Join(conf.StaticRoot, subpath)
	//if c.Query("log") != "disable" {
	//	queries.LogLastAccessed(fullpath)
	//}
	c.File(fullpath)
}
