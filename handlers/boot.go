package handlers

import (
	"net/http"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/tnyeanderson/ipxe-hub/config"
	"github.com/tnyeanderson/ipxe-hub/db/models"
	"github.com/tnyeanderson/ipxe-hub/db/queries"
	"github.com/tnyeanderson/ipxe-hub/utils"
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

	if device.Script.Slug == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Script not associated with device"})
		return
	}

	scriptPath := filepath.Join(config.BaseScriptsPath, device.Script.Slug)

	c.File(scriptPath)
}
