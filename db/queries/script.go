package queries

import (
	"errors"

	"github.com/tnyeanderson/ipxe-hub/db"
	"github.com/tnyeanderson/ipxe-hub/db/models"
)

func GetScripts() ([]models.Script, error) {
	var scripts []models.Script
	result := db.Get().Table("scripts").Select("*").Scan(&scripts)

	if result == nil {
		return nil, errors.New("error fetching scripts")
	}

	return scripts, nil
}

func AddScript(script models.Script) (*models.Script, error) {
	result := db.Get().Create(&script)

	if result.Error != nil {
		return nil, result.Error
	}

	return &script, nil
}

func UpdateScript(id uint, updated models.Script) (*models.Script, error) {
	var script models.Script
	result := db.Get().Model(&script).Where("id = ?", id).Updates(updated)

	if result.Error != nil {
		return nil, result.Error
	}

	return &script, nil
}

func DeleteScript(id uint) (*models.Script, error) {
	var script models.Script
	result := db.Get().First(&models.Script{}, id).Scan(&script)
	if result.Error != nil {
		return nil, result.Error
	}

	result = db.Get().Unscoped().Delete(&script)
	if result.Error != nil {
		return nil, result.Error
	}
	if result.RowsAffected == 0 {
		return nil, errors.New("no rows deleted")
	}

	return &script, nil
}
