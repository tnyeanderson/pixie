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
	fmt.Println("creating now: " + filepath.Dir(path))
	if err := os.MkdirAll(filepath.Dir(path), config.DefaultDirMode); err != nil {
		return err
	}
	print("no error")
	return nil
}

func saveFile(c *gin.Context, basepath string, subpath string) {
	data, _ := c.GetRawData()

	path := filepath.Join(basepath, subpath)

	print(path)

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

	c.JSON(http.StatusOK, gin.H{"status": fmt.Sprintf("'%s' uploaded!", path)})
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
