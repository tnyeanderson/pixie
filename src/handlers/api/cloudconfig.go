package api

import (
	"net/http"
	"os"
	"path/filepath"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/tnyeanderson/pixie/config"
	"github.com/tnyeanderson/pixie/db/models"
	"github.com/tnyeanderson/pixie/db/queries"
	"github.com/tnyeanderson/pixie/utils"
)

func GetAllCloudConfigsHandler(c *gin.Context) {
	cloudconfigs, err := queries.GetCloudConfigs()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	} else {
		c.JSON(http.StatusOK, cloudconfigs)
	}
}

func AddCloudConfigHandler(c *gin.Context) {
	// Validate input
	var cloudconfig models.CloudConfig
	var err error
	if err := c.ShouldBindJSON(&cloudconfig); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	cloudconfig.Path, err = utils.ValidatePath(cloudconfig.Path)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err = queries.AddCloudConfig(cloudconfig)

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cloudconfig})
}

func UpdateCloudConfigHandler(c *gin.Context) {
	// Validate input
	id64, err := strconv.ParseUint(c.Params.ByName("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
	}

	id := uint(id64)

	var cloudconfig models.CloudConfig
	if err := c.ShouldBindJSON(&cloudconfig); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	cloudconfig.Path, err = utils.ValidatePath(cloudconfig.Path)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err = queries.UpdateCloudConfig(id, cloudconfig)

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cloudconfig})
}

func DeleteCloudConfigHandler(c *gin.Context) {
	// Validate input
	id64, err := strconv.ParseUint(c.Params.ByName("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
	}

	id := uint(id64)

	cloudconfig, err := queries.DeleteCloudConfigById(id)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	// We don't care about errors here
	os.Remove(filepath.Join(config.Pixie.Paths.CloudConfigs, cloudconfig.Path))

	c.JSON(http.StatusOK, gin.H{"data": *cloudconfig})
}
