package models

import (
	"database/sql"

	"gorm.io/gorm"
)

type Script struct {
	gorm.Model
	Name         string `gorm:"unique"`
	Path         string `gorm:"unique;not null"`
	IsDefault    bool
	LastAccessed sql.NullTime
}
