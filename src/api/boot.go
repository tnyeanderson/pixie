package api

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tnyeanderson/pixie/utils"
)

func BootHandler(c *gin.Context) {
	mac, err := utils.SanitizeMac(c.Query("mac"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid MAC address"})
		return
	}

	d, ok := Config.Resolved[mac]
	if !ok {
		// TODO
		print("Adding device: " + mac)
		c.JSON(http.StatusBadRequest, gin.H{"error": "not found"})
		return
	}

	s, err := d.RenderScript(Config.StaticRoot)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to render boot script."})
		return
	}

	c.String(http.StatusOK, "%s", s)

	//queries.AddLogMessage(
	//	"BOOT",
	//	fmt.Sprint("Device ", device.Mac, " booted script ", scriptPath),
	//	fmt.Sprintf("%+v\n", device),
	//)

	//queries.UpdateDeviceLastBoot(device.ID)

	//queries.LogLastAccessed(scriptPath)

	//r := handlers.TextRender{}
	//r.TemplatePath = scriptPath
	//r.Data.PixieHost = c.Request.Host
	//if device.BootConfig.Config != "" {
	//	userData := make(map[string]interface{})
	//	err = json.Unmarshal([]byte(device.BootConfig.Config), &userData)
	//	if err != nil {
	//		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse JSON boot config"})
	//		return
	//	}
	//	r.Data.UserData = userData
	//}

}
