package models

import (
	"gorm.io/gorm"
)

type Log struct {
	gorm.Model
	Type    string
	Summary string
	Detail  string
}
