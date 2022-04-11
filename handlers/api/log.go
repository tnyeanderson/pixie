package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tnyeanderson/pixie/db/queries"
)

func GetLogsHandler(c *gin.Context) {
	logs, err := queries.GetLogs()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	} else {
		c.JSON(http.StatusOK, logs)
	}
}
