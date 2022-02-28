package db

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"github.com/tnyeanderson/ipxe-hub/config"
	"github.com/tnyeanderson/ipxe-hub/db/models"
)

var DB *gorm.DB

func ConnectDatabase() {
	database, err := gorm.Open(sqlite.Open(config.DatabasePath))

	if err != nil {
		panic("Failed to connect to database!")
	}

	database.AutoMigrate(&models.Device{})
	database.AutoMigrate(&models.Script{})

	DB = database
}

func Get() *gorm.DB {
	return DB
}
