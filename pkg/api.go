package pixie

import (
	"log"
	"net/http"
	"path"

	"github.com/gin-gonic/gin"
	"github.com/tnyeanderson/pixie/pkg/utils"
)

func (s *Server) bootHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		mac := c.Query("mac")

		mac, err := utils.SanitizeMac(mac)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid MAC address"})
			return
		}

		s, err := s.renderScript(mac)
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to render boot script."})
			return
		}

		c.String(http.StatusOK, "%s", s)
	}
}

func (s *Server) staticHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		mac := c.Param("mac")
		subpath := c.Param("path")

		fullpath := path.Join(s.StaticRoot, subpath)
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

			b, d := s.getBootAndDevice(mac)
			if d == nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "device not found"})
				return
			}

			s, err := d.renderFile(fullpath, b.Vars)
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
}
