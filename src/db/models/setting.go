package models

import (
	"gorm.io/gorm"
)

type Setting struct {
	gorm.Model
	Key          string `gorm:"unique"`
	Value        string
	DefaultValue string
}
