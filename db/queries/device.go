package queries

import (
	"errors"

	"github.com/tnyeanderson/ipxe-hub/db"
	"github.com/tnyeanderson/ipxe-hub/db/models"
)

func GetDevices() ([]models.Device, error) {
	var devices []models.Device
	result := db.Get().Joins("Script").Find(&devices)

	if result == nil {
		return nil, errors.New("error fetching devices")
	}

	return devices, nil
}

func GetDeviceByMac(mac string) (*models.Device, error) {
	var device models.Device
	result := db.Get().Joins("Script").First(&device, "mac = ?", mac)

	if result.Error != nil || device.ID == 0 {
		return nil, result.Error
	}

	return &device, nil
}

func AddDevice(device models.Device) (*models.Device, error) {
	result := db.Get().Create(&device)

	if result.Error != nil {
		return nil, result.Error
	}

	return &device, nil
}

func UpdateDevice(id uint, updated models.Device) (*models.Device, error) {
	var device models.Device
	result := db.Get().Model(&device).Where("id = ?", id).Updates(updated)

	if result.Error != nil {
		return nil, result.Error
	}

	return &device, nil
}

func DeleteDevice(id uint) (*models.Device, error) {
	var device models.Device
	result := db.Get().First(&models.Device{}, id).Scan(&device)
	if result.Error != nil {
		return nil, result.Error
	}

	result = db.Get().Unscoped().Delete(&device)
	if result.Error != nil {
		return nil, result.Error
	}
	if result.RowsAffected == 0 {
		return nil, errors.New("no rows deleted")
	}

	return &device, nil
}
