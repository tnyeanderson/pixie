package models

import (
	"database/sql"

	"gorm.io/gorm"
)

type CloudConfig struct {
	gorm.Model
	Name         string `gorm:"unique"`
	Path         string `gorm:"unique;not null"`
	LastAccessed sql.NullTime
}
