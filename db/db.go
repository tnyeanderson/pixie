package db

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"

	"github.com/tnyeanderson/ipxe-hub/config"
	"github.com/tnyeanderson/ipxe-hub/db/models"
)

var DB *gorm.DB

func ConnectDatabase() {
	database, err := gorm.Open("sqlite3", config.DatabasePath)

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
