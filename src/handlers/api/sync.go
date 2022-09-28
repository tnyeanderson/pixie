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

func SyncFilesHandler(c *gin.Context) {
	files, err := utils.GetFilesRecursive(config.Pixie.Paths.FileServer)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	filesInDatabase, err := queries.GetFiles()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	paths := []string{}
	for _, f := range filesInDatabase {
		paths = append(paths, f.Path)
	}

	toAdd, toDelete := utils.GetUniqueArrayDiff(paths, files)

	errors := []string{}

	for _, path := range toAdd {
		f := models.File{}
		_, fileName := filepath.Split(path)
		f.Name = queries.GetNewFileName(fileName)
		f.Path = path

		_, err := queries.AddFile(f)

		if err != nil {
			msg := path + ": " + err.Error()
			errors = append(errors, msg)
		}
	}

	for _, path := range toDelete {
		if _, err := queries.DeleteFileByPath(path); err != nil {
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
