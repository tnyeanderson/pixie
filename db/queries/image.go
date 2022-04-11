package queries

import (
	"errors"

	"github.com/tnyeanderson/ipxe-hub/db"
	"github.com/tnyeanderson/ipxe-hub/db/models"
	"github.com/tnyeanderson/ipxe-hub/utils"
)

func GetImages() ([]models.Image, error) {
	var images []models.Image
	result := db.Get().Table("images").Select("*").Scan(&images)

	if result == nil {
		return nil, errors.New("error fetching images")
	}

	return images, nil
}

func GetDefaultImage() (*models.Image, error) {
	var image models.Image
	result := db.Get().Model(&models.Image{}).Where("is_default = ?", true).First(&image)

	if result == nil || image.ID == 0 {
		return nil, errors.New("error fetching default image")
	}

	return &image, nil
}

func GetNewImageName(name string) string {
	var images []models.Image

	result := db.Get().Model(&models.Image{}).Where("name like ?", name+"%").Order("name asc").Scan(&images)
	if result == nil || len(images) == 0 {
		return name
	}

	existingNames := []string{}
	for _, item := range images {
		existingNames = append(existingNames, item.Name)
	}

	return utils.GetNextName(name, existingNames)
}

func AddImage(image models.Image) (*models.Image, error) {
	result := db.Get().Create(&image)

	if result.Error != nil {
		return nil, result.Error
	}

	return &image, nil
}

func UpdateImage(id uint, updated models.Image) (*models.Image, error) {
	var image models.Image
	result := db.Get().Model(image).Select("Name", "Path").Where("id = ?", id).Updates(updated)

	if result.Error != nil {
		return nil, result.Error
	}

	return &image, nil
}

func DeleteImageById(id uint) (*models.Image, error) {
	var image models.Image
	result := db.Get().First(&image, id)
	if result.Error != nil {
		return nil, result.Error
	}

	return DeleteImage(image)
}

func DeleteImageByPath(path string) (*models.Image, error) {
	var image models.Image
	result := db.Get().Where("path = ?", path).First(&image)
	if result.Error != nil {
		return nil, result.Error
	}

	return DeleteImage(image)
}

func DeleteImage(image models.Image) (*models.Image, error) {
	result := db.Get().Unscoped().Delete(&image)
	if result.Error != nil {
		return nil, result.Error
	}
	if result.RowsAffected == 0 {
		return nil, errors.New("no rows deleted")
	}

	return &image, nil
}
