package models

import (
	"github.com/tnyeanderson/pixie/types"
	"gorm.io/gorm"
)

type File struct {
	gorm.Model
	Name           string `gorm:"unique"`
	Path           string `gorm:"unique;not null"`
	LastAccessedAt types.NullTime
	FileType       string
}
