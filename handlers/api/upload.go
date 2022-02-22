package api

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/tnyeanderson/ipxe-hub/config"
	"github.com/tnyeanderson/ipxe-hub/utils"
)

func createDirectories(path string) error {
	if err := os.MkdirAll(filepath.Dir(path), config.DefaultDirMode); err != nil {
		return err
	}
	return nil
}

func saveFile(c *gin.Context, basepath string, subpath string) {
	data, _ := c.GetRawData()

	path := filepath.Join(basepath, subpath)

	err := createDirectories(path)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	err = ioutil.WriteFile(path, data, config.DefaultFileMode)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.String(http.StatusOK, fmt.Sprintf("'%s' uploaded!", path))
}

func UploadImageHandler(c *gin.Context) {
	subpath := c.Query("path")

	if _, err := utils.ValidatePath(subpath); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	saveFile(c, config.BaseImagesPath, subpath)
}

func UploadScriptHandler(c *gin.Context) {
	path := c.Query("path")

	if _, err := utils.ValidatePath(path); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	saveFile(c, config.BaseScriptsPath, path)
}
