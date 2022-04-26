package models

import (
	"database/sql"

	"gorm.io/gorm"
)

// NOTE: SQLite doesn't support adding foreign keys after the fact. Add it in manually instead

type Device struct {
	gorm.Model
	Mac        string `gorm:"unique;not null"`
	Name       string
	GroupName  string
	LastBooted sql.NullTime
	ScriptID   uint `gorm:"type:INT UNSIGNED REFERENCES scripts(id) ON DELETE RESTRICT ON UPDATE RESTRICT"`
	Script     Script
}
