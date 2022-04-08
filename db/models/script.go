package models

import (
	"gorm.io/gorm"
)

type Script struct {
	gorm.Model
	Name      string `gorm:"unique"`
	Path      string `gorm:"unique;not null"`
	IsDefault bool
}
