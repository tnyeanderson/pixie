package models

import (
	"gorm.io/gorm"
)

type Image struct {
	gorm.Model
	Name string `gorm:"unique"`
	Path string `gorm:"unique;not null"`
}
