package api

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"strings"

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
	path := filepath.Join(basepath, subpath)

	err := createDirectories(path)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if strings.HasPrefix(c.GetHeader("Content-Type"), "multipart/form-data") {
		err = saveUploadedFile(c, path)
	} else {
		err = saveFileByText(c, path)
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": fmt.Sprintf("'%s' uploaded!", path)})
}

func saveUploadedFile(c *gin.Context, path string) error {
	fmt.Println("Uploading file. Headers: ", c.GetHeader("Content-Type"))
	file, err := c.FormFile("file")

	if err != nil {
		return err
	}

	if err := c.SaveUploadedFile(file, path); err != nil {
		return err
	}

	return nil
}

func saveFileByText(c *gin.Context, path string) error {
	fmt.Println("Uploading text. Headers: ", c.GetHeader("Content-Type"))
	data, _ := c.GetRawData()

	err := ioutil.WriteFile(path, data, config.DefaultFileMode)

	if err != nil {
		return err
	}

	return nil
}

func UploadImageHandler(c *gin.Context) {
	subpath, err := utils.ValidatePath(c.Query("path"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	saveFile(c, config.BaseImagesPath, subpath)
}

func UploadScriptHandler(c *gin.Context) {
	path, err := utils.ValidatePath(c.Query("path"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	saveFile(c, config.BaseScriptsPath, path)
}
