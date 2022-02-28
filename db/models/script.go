package models

import (
	"gorm.io/gorm"
)

type Script struct {
	gorm.Model
	Name      string
	Path      string `gorm:"unique;not null"`
	IsDefault bool
}
