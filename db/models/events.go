package models

import (
	"gorm.io/gorm"
)

type Event struct {
	gorm.Model
	Type     string
	DeviceID uint `gorm:"type:INT UNSIGNED REFERENCES device(id) ON DELETE RESTRICT ON UPDATE RESTRICT"`
	Device   Device
	ScriptID uint `gorm:"type:INT UNSIGNED REFERENCES scripts(id) ON DELETE RESTRICT ON UPDATE RESTRICT"`
	Script   Script
}
