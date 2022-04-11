package api

import (
	"net/http"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/tnyeanderson/pixie/config"
	"github.com/tnyeanderson/pixie/db/models"
	"github.com/tnyeanderson/pixie/db/queries"
	"github.com/tnyeanderson/pixie/utils"
)

func SyncScriptsHandler(c *gin.Context) {
	files, err := utils.GetFilesRecursive(config.BaseScriptsPath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	scripts, err := queries.GetScripts()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	paths := []string{}
	for _, script := range scripts {
		paths = append(paths, script.Path)
	}

	toAdd, toDelete := utils.GetArrayDiff(paths, files)

	errors := []string{}

	for _, path := range toAdd {
		script := models.Script{}
		_, fileName := filepath.Split(path)
		script.Name = queries.GetNewScriptName(fileName)
		script.Path = path
		script.IsDefault = false

		_, err := queries.AddScript(script)

		if err != nil {
			msg := path + ": " + err.Error()
			errors = append(errors, msg)
		}
	}

	for _, path := range toDelete {
		if _, err := queries.DeleteScriptByPath(path); err != nil {
			msg := path + ": " + err.Error()
			errors = append(errors, msg)
		}
	}

	if len(errors) > 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"errors": errors})
		return
	}

	c.JSON(http.StatusOK, paths)
}

func SyncImagesHandler(c *gin.Context) {
	files, err := utils.GetFilesRecursive(config.BaseImagesPath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	images, err := queries.GetImages()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	paths := []string{}
	for _, image := range images {
		paths = append(paths, image.Path)
	}

	toAdd, toDelete := utils.GetArrayDiff(paths, files)

	errors := []string{}

	for _, path := range toAdd {
		image := models.Image{}
		_, fileName := filepath.Split(path)
		image.Name = queries.GetNewImageName(fileName)
		image.Path = path

		_, err := queries.AddImage(image)

		if err != nil {
			msg := path + ": " + err.Error()
			errors = append(errors, msg)
		}
	}

	for _, path := range toDelete {
		if _, err := queries.DeleteImageByPath(path); err != nil {
			msg := path + ": " + err.Error()
			errors = append(errors, msg)
		}
	}

	if len(errors) > 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"errors": errors})
		return
	}

	c.JSON(http.StatusOK, paths)
}
