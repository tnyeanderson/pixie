package models

import (
	"github.com/jinzhu/gorm"
)

type Script struct {
	gorm.Model
	Name string
	Slug string `gorm:"unique;not null"`
}
