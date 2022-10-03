package api

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/tnyeanderson/pixie/models"
	"github.com/tnyeanderson/pixie/db/queries"
	"github.com/tnyeanderson/pixie/utils"
)

func GetAllDevicesHandler(c *gin.Context) {
	devices, err := queries.GetDevices()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	} else {
		c.JSON(http.StatusOK, devices)
	}
}

func GetDeviceByMacHandler(c *gin.Context) {
	mac := c.Params.ByName("mac")
	device, err := queries.GetDeviceByMac(mac)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	} else {
		c.JSON(http.StatusOK, device)
	}
}

func AddDeviceHandler(c *gin.Context) {
	// Validate input
	var device models.Device
	if err := c.ShouldBindJSON(&device); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	sanitizedMac, err := utils.SanitizeMac(device.Mac)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid MAC address"})
		return
	}

	device.Mac = sanitizedMac

	_, err = queries.AddDevice(device)

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": device})
}

func UpdateDeviceHandler(c *gin.Context) {
	// Validate input
	id64, err := strconv.ParseUint(c.Params.ByName("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
	}

	id := uint(id64)

	var device models.Device
	if err := c.ShouldBindJSON(&device); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	sanitizedMac, err := utils.SanitizeMac(device.Mac)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid MAC address"})
		return
	}

	device.Mac = sanitizedMac

	_, err = queries.UpdateDevice(id, device)

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": device})
}

func DeleteDeviceHandler(c *gin.Context) {
	// Validate input
	id64, err := strconv.ParseUint(c.Params.ByName("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
	}

	id := uint(id64)

	device, err := queries.DeleteDevice(id)

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": *device})
}
