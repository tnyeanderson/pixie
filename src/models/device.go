package models

import "time"

// NOTE: SQLite doesn't support adding foreign keys after the fact. Add it in manually instead

type Device struct {
	BaseModel
	Mac          string     `json:"mac" gorm:"unique;not null"`
	Name         string     `json:"name"`
	LastBootedAt *time.Time `json:"lastBootedAt"`
	BootConfigID uint       `json:"bootConfigId" gorm:"type:INT UNSIGNED REFERENCES boot_config(id) ON DELETE RESTRICT ON UPDATE RESTRICT"`
	BootConfig   BootConfig `json:"bootConfig"`
	ScriptID     uint       `json:"scriptId" gorm:"type:INT UNSIGNED REFERENCES files(id) ON DELETE RESTRICT ON UPDATE RESTRICT"`
	Script       File       `json:"script"`
}
