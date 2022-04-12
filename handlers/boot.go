package handlers

import (
	"fmt"
	"net/http"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/tnyeanderson/pixie/config"
	"github.com/tnyeanderson/pixie/db/models"
	"github.com/tnyeanderson/pixie/db/queries"
	"github.com/tnyeanderson/pixie/utils"
)

func BootHandler(c *gin.Context) {
	mac, err := utils.SanitizeMac(c.Query("mac"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid MAC address"})
		return
	}

	d, err := queries.GetDeviceByMac(mac)
	var device models.Device

	if err != nil {
		print("Adding device: " + mac)
		device = models.Device{}
		device.Mac = mac
		_, err := queries.AddDevice(device)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	} else {
		device = *d
	}

	var scriptPath string
	if device.Script.Path == "" {
		scriptPath = config.Pixie.Paths.FallbackScript
	} else {
		scriptPath = filepath.Join(config.Pixie.Paths.Scripts, device.Script.Path)
	}

	queries.AddLogMessage(
		fmt.Sprint("Device ", device.Mac, " booted script ", scriptPath),
		fmt.Sprintf("%+v\n", device),
	)

	c.File(scriptPath)
}
