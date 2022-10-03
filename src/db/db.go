package db

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"github.com/tnyeanderson/pixie/config"
	"github.com/tnyeanderson/pixie/models"
)

var DB *gorm.DB

func Initialize() {
	database, err := gorm.Open(sqlite.Open(config.Pixie.Paths.Database))

	if err != nil {
		panic("Failed to connect to database!")
	}

	// Set up tables based on models
	database.AutoMigrate(&models.Device{})
	database.AutoMigrate(&models.File{})
	database.AutoMigrate(&models.Log{})
	database.AutoMigrate(&models.Setting{})

	DB = database
}

func Get() *gorm.DB {
	return DB
}
