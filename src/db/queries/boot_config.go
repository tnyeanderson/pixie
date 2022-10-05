package queries

import (
	"errors"
	"fmt"

	"github.com/tnyeanderson/pixie/db"
	"github.com/tnyeanderson/pixie/models"
	"github.com/tnyeanderson/pixie/utils"
)

func GetBootConfigs() ([]models.BootConfig, error) {
	var bootConfigs []models.BootConfig
	result := db.Get().Table("boot_configs").Select("*").Scan(&bootConfigs)

	if result == nil {
		return nil, errors.New("error fetching bootConfigs")
	}

	return bootConfigs, nil
}

func GetNewBootConfigName(name string) string {
	var bootConfigs []models.BootConfig

	result := db.Get().Model(&models.BootConfig{}).Where("name like ?", name+"%").Order("name asc").Scan(&bootConfigs)
	if result == nil || len(bootConfigs) == 0 {
		return name
	}

	existingNames := []string{}
	for _, item := range bootConfigs {
		existingNames = append(existingNames, item.Name)
	}

	return utils.GetNextName(name, existingNames)
}

func AddBootConfig(bootConfig models.BootConfig) (*models.BootConfig, error) {
	result := db.Get().Create(&bootConfig)

	if result.Error != nil {
		return nil, result.Error
	}

	AddLogMessage(
		"CREATE",
		fmt.Sprint("Added bootConfig: ID=", bootConfig.ID, ", Config=", bootConfig.Config),
		fmt.Sprintf("%+v\n", bootConfig),
	)

	return &bootConfig, nil
}

func UpdateBootConfig(id uint, updated models.BootConfig) (*models.BootConfig, error) {
	var bootConfig models.BootConfig
	result := db.Get().Model(bootConfig).Select("Name", "Config").Where("id = ?", id).Updates(updated)

	if result.Error != nil {
		return nil, result.Error
	}

	AddLogMessage(
		"UPDATE",
		fmt.Sprintf("Updated bootConfig: ID=%s, Config=%s", id, updated.Config),
		fmt.Sprintf("%+v\n", updated),
	)

	return &bootConfig, nil
}

func DeleteBootConfigById(id uint) (*models.BootConfig, error) {
	var bootConfig models.BootConfig
	result := db.Get().First(&bootConfig, id)
	if result.Error != nil {
		return nil, result.Error
	}

	return DeleteBootConfig(bootConfig)
}

func DeleteBootConfig(bootConfig models.BootConfig) (*models.BootConfig, error) {
	result := db.Get().Unscoped().Delete(&bootConfig)
	if result.Error != nil {
		return nil, result.Error
	}
	if result.RowsAffected == 0 {
		return nil, errors.New("no rows deleted")
	}

	AddLogMessage(
		"DELETE",
		fmt.Sprint("Deleted bootConfig: ID=", bootConfig.ID, ", Config=", bootConfig.Config),
		fmt.Sprintf("%+v\n", bootConfig),
	)

	return &bootConfig, nil
}
