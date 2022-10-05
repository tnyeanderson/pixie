package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/tnyeanderson/pixie/config"
	"github.com/tnyeanderson/pixie/db/queries"
	"github.com/tnyeanderson/pixie/handlers"
	"github.com/tnyeanderson/pixie/models"
	"github.com/tnyeanderson/pixie/utils"
)

func BootHandler(c *gin.Context) {
	mac, err := utils.SanitizeMac(c.Query("mac"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid MAC address"})
		return
	}

	d, err := queries.GetDeviceByMac(mac)
	var device *models.Device

	if err != nil {
		print("Adding device: " + mac)
		toAdd := models.Device{}
		toAdd.Mac = mac
		device, err = queries.AddDevice(toAdd)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	} else {
		device = d
	}

	var scriptPath string
	if device.Script.Path == "" {
		scriptPath = config.Pixie.Paths.FallbackScript
	} else {
		scriptPath = filepath.Join(config.Pixie.Paths.FileServer, device.Script.Path)
	}

	queries.AddLogMessage(
		"BOOT",
		fmt.Sprint("Device ", device.Mac, " booted script ", scriptPath),
		fmt.Sprintf("%+v\n", device),
	)

	queries.UpdateDeviceLastBoot(device.ID)

	queries.LogLastAccessed(scriptPath)

	r := handlers.TextRender{}
	r.TemplatePath = scriptPath
	r.Data.PixieHost = c.Request.Host
	if device.BootConfig.Config != "" {
		userData := make(map[string]interface{})
		err = json.Unmarshal([]byte(device.BootConfig.Config), &userData)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse JSON boot config"})
			return
		}
		r.Data.UserData = userData
	}

	c.Render(http.StatusOK, &r)
}
