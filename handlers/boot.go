package handlers

import (
	"net/http"
	"path/filepath"

	"github.com/tnyeanderson/ipxe-hub/config"
	"github.com/tnyeanderson/ipxe-hub/db/models"
	"github.com/tnyeanderson/ipxe-hub/db/queries"
	"github.com/tnyeanderson/ipxe-hub/utils"
)

func BootHandler(rw http.ResponseWriter, r *http.Request) {
	mac, err := utils.SanitizeMac(r.URL.Query().Get("mac"))
	if err != nil {
		http.Error(rw, "Invalid MAC address", 400)
		return
	}

	d, err := queries.GetDeviceByMac(mac)
	var device models.Device

	if err != nil {
		print("Adding device: " + mac)
		device = models.Device{}
		device.Mac.String = mac
		device.Mac.Valid = true
		success, err := queries.AddDevice(&device)
		if err != nil || !success {
			http.Error(rw, "Failed to add device", 400)
			return
		}
	} else {
		device = *d
	}

	if !device.Script.Slug.Valid {
		http.Error(rw, "Script not associated with device", 400)
		return
	}

	scriptPath := filepath.Join(config.BaseScriptsPath, device.Script.Slug.String)
	print(scriptPath)

	http.ServeFile(rw, r, scriptPath)

}
