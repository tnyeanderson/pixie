package api

import (
	"log"
	"net/http"
	"path"

	"github.com/gin-gonic/gin"
	"github.com/tnyeanderson/pixie/config"
	"github.com/tnyeanderson/pixie/utils"
)

func StaticHandler(c *gin.Context) {
	mac := c.Param("mac")
	subpath := c.Param("path")

	co, _ := c.Get("conf")
	conf := co.(*config.Config)

	fullpath := path.Join(conf.StaticRoot, subpath)
	//if c.Query("log") != "disable" {
	//	queries.LogLastAccessed(fullpath)
	//}

	// Render the file as a template
	if mac != "" {
		mac, err := utils.SanitizeMac(mac)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid MAC address"})
			return
		}

		d, ok := conf.Resolved[mac]
		if !ok {
			c.JSON(http.StatusBadRequest, gin.H{"error": "device not found"})
			return
		}

		s, err := d.RenderFile(fullpath)
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to render file."})
			return
		}

		c.String(http.StatusOK, "%s", s)
		return
	}

	// Render the file normally
	c.File(fullpath)
}
