package api

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/tnyeanderson/ipxe-hub/db/models"
	"github.com/tnyeanderson/ipxe-hub/db/queries"
)

func GetAllScriptsHandler(c *gin.Context) {
	scripts, err := queries.GetScripts()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	} else {
		c.JSON(http.StatusOK, scripts)
	}
}

func AddScriptHandler(c *gin.Context) {
	// Validate input
	var script models.Script
	if err := c.ShouldBindJSON(&script); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err := queries.AddScript(script)

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": script})
}

func UpdateScriptHandler(c *gin.Context) {
	// Validate input
	id64, err := strconv.ParseUint(c.Params.ByName("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
	}

	id := uint(id64)

	var script models.Script
	if err := c.ShouldBindJSON(&script); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err = queries.UpdateScript(id, script)

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": script})
}

func DeleteScriptHandler(c *gin.Context) {
	// Validate input
	id64, err := strconv.ParseUint(c.Params.ByName("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
	}

	id := uint(id64)

	script, err := queries.DeleteScript(id)

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": *script})
}
