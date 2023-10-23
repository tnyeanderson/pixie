package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tnyeanderson/pixie/config"
)

var ConfigPath string

func GetConfig(c *gin.Context) {
	conf := config.Config{}
	if err := conf.Load(ConfigPath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load config"})
		c.Abort()
		return
	}
	c.Set("conf", &conf)
}
