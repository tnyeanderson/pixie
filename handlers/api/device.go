package api

import (
	"net/http"

	"github.com/tnyeanderson/ipxe-hub/db/models"
	"github.com/tnyeanderson/ipxe-hub/db/queries"
	"github.com/tnyeanderson/ipxe-hub/utils"
)

func GetAllDevicesHandler(rw http.ResponseWriter, r *http.Request) {
	devices, err := queries.GetDevices()

	if err != nil {
		http.Error(rw, "Error getting devices", http.StatusInternalServerError)
		return
	}

	utils.WriteJson(rw, devices)
}

func AddDeviceHandler(rw http.ResponseWriter, r *http.Request) {
	var device models.Device

	_, err := utils.ParseJson(&device, rw, r)

	if err != nil {
		// http error responses are sent by ParseJson
		return
	}

	success, err := queries.AddDevice(&device)

	if !success || err != nil {
		http.Error(rw, "Failed to add device to database", http.StatusInternalServerError)
		return
	}
}
