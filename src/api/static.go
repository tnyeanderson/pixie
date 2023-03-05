package api

import (
	"path"

	"github.com/gin-gonic/gin"
)

func StaticHandler(c *gin.Context) {
	subpath := c.Param("path")
	fullpath := path.Join(Config.StaticRoot, subpath)
	//if c.Query("log") != "disable" {
	//	queries.LogLastAccessed(fullpath)
	//}
	c.File(fullpath)
}
