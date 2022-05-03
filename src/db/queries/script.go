package queries

import (
	"errors"
	"fmt"
	"time"

	"github.com/tnyeanderson/pixie/config"
	"github.com/tnyeanderson/pixie/db"
	"github.com/tnyeanderson/pixie/db/models"
	"github.com/tnyeanderson/pixie/utils"
)

func GetScripts() ([]models.Script, error) {
	var scripts []models.Script
	result := db.Get().Table("scripts").Select("*").Scan(&scripts)

	if result == nil {
		return nil, errors.New("error fetching scripts")
	}

	return scripts, nil
}

func GetDefaultScript() (*models.Script, error) {
	var script models.Script
	result := db.Get().Model(&models.Script{}).Where("is_default = ?", true).First(&script)

	if result == nil || script.ID == 0 {
		return nil, errors.New("error fetching default script")
	}

	return &script, nil
}

func GetNewScriptName(name string) string {
	var scripts []models.Script

	result := db.Get().Model(&models.Script{}).Where("name like ?", name+"%").Order("name asc").Scan(&scripts)
	if result == nil || len(scripts) == 0 {
		return name
	}

	existingNames := []string{}
	for _, item := range scripts {
		existingNames = append(existingNames, item.Name)
	}

	return utils.GetNextName(name, existingNames)
}

func AddScript(script models.Script) (*models.Script, error) {
	result := db.Get().Create(&script)

	if result.Error != nil {
		return nil, result.Error
	}

	AddLogMessage(
		"CREATE",
		fmt.Sprint("Added script: ID=", script.ID, ", Path=", script.Path),
		fmt.Sprintf("%+v\n", script),
	)

	return &script, nil
}

func UpdateScript(id uint, updated models.Script) (*models.Script, error) {
	var script models.Script
	result := db.Get().Model(script).Select("Name", "Path", "IsDefault").Where("id = ?", id).Updates(updated)

	if result.Error != nil {
		return nil, result.Error
	}

	AddLogMessage(
		"UPDATE",
		fmt.Sprint("Updated script: ID=", id, ", Path=", updated.Path),
		fmt.Sprintf("%+v\n", updated),
	)

	return &script, nil
}

func UpdateScriptLastAccessedByPath(fullpath string) error {
	var script models.Script
	scriptpath := utils.GetRelativeScriptPath(fullpath, config.Pixie)
	result := db.Get().Model(script).Where("path = ?", scriptpath).Update("last_accessed", time.Now())

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func DeleteScriptById(id uint) (*models.Script, error) {
	var script models.Script
	result := db.Get().First(&script, id)
	if result.Error != nil {
		return nil, result.Error
	}

	return DeleteScript(script)
}

func DeleteScriptByPath(path string) (*models.Script, error) {
	var script models.Script
	result := db.Get().Where("path = ?", path).First(&script)
	if result.Error != nil {
		return nil, result.Error
	}

	return DeleteScript(script)
}

func DeleteScript(script models.Script) (*models.Script, error) {
	result := db.Get().Unscoped().Delete(&script)
	if result.Error != nil {
		return nil, result.Error
	}
	if result.RowsAffected == 0 {
		return nil, errors.New("no rows deleted")
	}

	AddLogMessage(
		"DELETE",
		fmt.Sprint("Deleted script: ID=", script.ID, ", Path=", script.Path),
		fmt.Sprintf("%+v\n", script),
	)

	return &script, nil
}
