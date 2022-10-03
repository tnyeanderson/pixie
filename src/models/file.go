package models

import "time"

type File struct {
	BaseModel
	Name           string     `json:"name"  gorm:"unique"`
	Path           string     `json:"path" gorm:"unique;not null"`
	LastAccessedAt *time.Time `json:"lastAccessedAt"`
	FileType       string     `json:"fileType"`
}
