package api

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/tnyeanderson/pixie/db/queries"
	"github.com/tnyeanderson/pixie/models"
)

func GetAllBootConfigsHandler(c *gin.Context) {
	bootConfigs, err := queries.GetBootConfigs()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	} else {
		c.JSON(http.StatusOK, bootConfigs)
	}
}

func AddBootConfigHandler(c *gin.Context) {
	// Validate input
	var bootConfig models.BootConfig
	var err error
	if err := c.ShouldBindJSON(&bootConfig); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if !json.Valid([]byte(bootConfig.Config)) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON in config field"})
		return
	}

	_, err = queries.AddBootConfig(bootConfig)

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bootConfig})
}

func UpdateBootConfigHandler(c *gin.Context) {
	// Validate input
	id64, err := strconv.ParseUint(c.Params.ByName("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
	}

	id := uint(id64)

	var bootConfig models.BootConfig
	if err := c.ShouldBindJSON(&bootConfig); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if !json.Valid([]byte(bootConfig.Config)) {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err = queries.UpdateBootConfig(id, bootConfig)

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bootConfig})
}

func DeleteBootConfigHandler(c *gin.Context) {
	// Validate input
	id64, err := strconv.ParseUint(c.Params.ByName("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
	}

	id := uint(id64)

	bootConfig, err := queries.DeleteBootConfigById(id)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": *bootConfig})
}
