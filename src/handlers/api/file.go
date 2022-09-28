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

func GetAllFilesHandler(c *gin.Context) {
	files, err := queries.GetFiles()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	} else {
		c.JSON(http.StatusOK, files)
	}
}

func AddFileHandler(c *gin.Context) {
	// Validate input
	var file models.File
	var err error
	if err := c.ShouldBindJSON(&file); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	file.Path, err = utils.ValidatePath(file.Path)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err = queries.AddFile(file)

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": file})
}

func UpdateFileHandler(c *gin.Context) {
	// Validate input
	id64, err := strconv.ParseUint(c.Params.ByName("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
	}

	id := uint(id64)

	var file models.File
	if err := c.ShouldBindJSON(&file); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	file.Path, err = utils.ValidatePath(file.Path)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err = queries.UpdateFile(id, file)

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": file})
}

func DeleteFileHandler(c *gin.Context) {
	// Validate input
	id64, err := strconv.ParseUint(c.Params.ByName("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
	}

	id := uint(id64)

	file, err := queries.DeleteFileById(id)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	// We don't care about errors here
	os.Remove(filepath.Join(config.Pixie.Paths.FileServer, file.Path))

	c.JSON(http.StatusOK, gin.H{"data": *file})
}
