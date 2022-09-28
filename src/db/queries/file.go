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

func GetFiles() ([]models.File, error) {
	var files []models.File
	result := db.Get().Table("files").Select("*").Scan(&files)

	if result == nil {
		return nil, errors.New("error fetching files")
	}

	return files, nil
}

func GetDefaultFile() (*models.File, error) {
	var file models.File
	result := db.Get().Model(&models.File{}).Where("is_default = ?", true).First(&file)

	if result == nil || file.ID == 0 {
		return nil, errors.New("error fetching default file")
	}

	return &file, nil
}

func GetNewFileName(name string) string {
	var files []models.File

	result := db.Get().Model(&models.File{}).Where("name like ?", name+"%").Order("name asc").Scan(&files)
	if result == nil || len(files) == 0 {
		return name
	}

	existingNames := []string{}
	for _, item := range files {
		existingNames = append(existingNames, item.Name)
	}

	return utils.GetNextName(name, existingNames)
}

func AddFile(file models.File) (*models.File, error) {
	result := db.Get().Create(&file)

	if result.Error != nil {
		return nil, result.Error
	}

	AddLogMessage(
		"CREATE",
		fmt.Sprint("Added file: ID=", file.ID, ", Path=", file.Path),
		fmt.Sprintf("%+v\n", file),
	)

	return &file, nil
}

func UpdateFile(id uint, updated models.File) (*models.File, error) {
	var file models.File
	result := db.Get().Model(file).Select("Name", "Path").Where("id = ?", id).Updates(updated)

	if result.Error != nil {
		return nil, result.Error
	}

	AddLogMessage(
		"UPDATE",
		fmt.Sprint("Updated file: ID=", id, ", Path=", updated.Path),
		fmt.Sprintf("%+v\n", updated),
	)

	return &file, nil
}

func UpdateFileLastAccessedByPath(fullpath string) error {
	var file models.File
	filepath := utils.GetRelativeFilePath(fullpath, config.Pixie)
	result := db.Get().Model(file).Where("path = ?", filepath).Update("last_accessed_by", time.Now())

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func DeleteFileById(id uint) (*models.File, error) {
	var file models.File
	result := db.Get().First(&file, id)
	if result.Error != nil {
		return nil, result.Error
	}

	return DeleteFile(file)
}

func DeleteFileByPath(path string) (*models.File, error) {
	var file models.File
	result := db.Get().Where("path = ?", path).First(&file)
	if result.Error != nil {
		return nil, result.Error
	}

	return DeleteFile(file)
}

func DeleteFile(file models.File) (*models.File, error) {
	result := db.Get().Unscoped().Delete(&file)
	if result.Error != nil {
		return nil, result.Error
	}
	if result.RowsAffected == 0 {
		return nil, errors.New("no rows deleted")
	}

	AddLogMessage(
		"DELETE",
		fmt.Sprint("Deleted file: ID=", file.ID, ", Path=", file.Path),
		fmt.Sprintf("%+v\n", file),
	)

	return &file, nil
}
