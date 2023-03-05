package api

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tnyeanderson/pixie/config"
)

var ConfigPath string
var Config *config.Config

func GetConfigHandler(c *gin.Context) {
	b, err := Config.Export()
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to export config."})
		return
	}
	c.String(http.StatusOK, "%s", string(b))
}

func ReloadConfigHandler(c *gin.Context) {
	ReloadConfig()
}

func ReloadConfig() {
	conf := config.Config{}
	err := conf.Load(ConfigPath)
	if err != nil {
		log.Fatal(err)
	}
	Config = &conf
}
