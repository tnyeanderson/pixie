package models

import (
	"github.com/tnyeanderson/pixie/types"
	"gorm.io/gorm"
)

type Script struct {
	gorm.Model
	Name         string `gorm:"unique"`
	Path         string `gorm:"unique;not null"`
	IsDefault    bool
	LastAccessed types.NullTime
}
