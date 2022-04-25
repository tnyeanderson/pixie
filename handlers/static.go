package handlers

import (
	"path"

	"github.com/gin-gonic/gin"
	"github.com/tnyeanderson/pixie/config"
	"github.com/tnyeanderson/pixie/db/queries"
)

func StaticHandler(c *gin.Context) {
	subpath := c.Param("path")
	fullpath := path.Join(config.Pixie.Paths.FileServer, subpath)
	queries.LogLastAccessed(fullpath)
	c.File(fullpath)
}
