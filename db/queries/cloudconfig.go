package queries

import (
	"errors"
	"fmt"
	"time"

	"github.com/tnyeanderson/pixie/db"
	"github.com/tnyeanderson/pixie/db/models"
	"github.com/tnyeanderson/pixie/utils"
)

func GetCloudConfigs() ([]models.CloudConfig, error) {
	var cloudconfigs []models.CloudConfig
	result := db.Get().Table("cloud_configs").Select("*").Scan(&cloudconfigs)

	if result == nil {
		return nil, errors.New("error fetching cloudconfigs")
	}

	return cloudconfigs, nil
}

func GetNewCloudConfigName(name string) string {
	var cloudconfigs []models.CloudConfig

	result := db.Get().Model(&models.CloudConfig{}).Where("name like ?", name+"%").Order("name asc").Scan(&cloudconfigs)
	if result == nil || len(cloudconfigs) == 0 {
		return name
	}

	existingNames := []string{}
	for _, item := range cloudconfigs {
		existingNames = append(existingNames, item.Name)
	}

	return utils.GetNextName(name, existingNames)
}

func AddCloudConfig(cloudconfig models.CloudConfig) (*models.CloudConfig, error) {
	result := db.Get().Create(&cloudconfig)

	if result.Error != nil {
		return nil, result.Error
	}

	AddLogMessage(
		"CREATE",
		fmt.Sprint("Added cloudconfig: ID=", cloudconfig.ID, ", Path=", cloudconfig.Path),
		fmt.Sprintf("%+v\n", cloudconfig),
	)

	return &cloudconfig, nil
}

func UpdateCloudConfig(id uint, updated models.CloudConfig) (*models.CloudConfig, error) {
	var cloudconfig models.CloudConfig
	result := db.Get().Model(cloudconfig).Select("Name", "Path").Where("id = ?", id).Updates(updated)

	if result.Error != nil {
		return nil, result.Error
	}

	AddLogMessage(
		"UPDATE",
		fmt.Sprint("Updated cloudconfig: ID=", id, ", Path=", updated.Path),
		fmt.Sprintf("%+v\n", updated),
	)

	return &cloudconfig, nil
}

func UpdateCloudConfigLastAccessedByPath(fullpath string) error {
	var cloudconfig models.CloudConfig
	cloudconfigpath := utils.GetRelativeCloudConfigPath(fullpath)
	result := db.Get().Model(cloudconfig).Where("path = ?", cloudconfigpath).Update("last_accessed", time.Now())

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func DeleteCloudConfigById(id uint) (*models.CloudConfig, error) {
	var cloudconfig models.CloudConfig
	result := db.Get().First(&cloudconfig, id)
	if result.Error != nil {
		return nil, result.Error
	}

	return DeleteCloudConfig(cloudconfig)
}

func DeleteCloudConfigByPath(path string) (*models.CloudConfig, error) {
	var cloudconfig models.CloudConfig
	result := db.Get().Where("path = ?", path).First(&cloudconfig)
	if result.Error != nil {
		return nil, result.Error
	}

	return DeleteCloudConfig(cloudconfig)
}

func DeleteCloudConfig(cloudconfig models.CloudConfig) (*models.CloudConfig, error) {
	result := db.Get().Unscoped().Delete(&cloudconfig)
	if result.Error != nil {
		return nil, result.Error
	}
	if result.RowsAffected == 0 {
		return nil, errors.New("no rows deleted")
	}

	AddLogMessage(
		"DELETE",
		fmt.Sprint("Deleted cloudconfig: ID=", cloudconfig.ID, ", Path=", cloudconfig.Path),
		fmt.Sprintf("%+v\n", cloudconfig),
	)

	return &cloudconfig, nil
}
