package models

import "time"

// NOTE: SQLite doesn't support adding foreign keys after the fact. Add it in manually instead

type Device struct {
	BaseModel
	Mac          string     `json:"mac" gorm:"unique;not null"`
	Name         string     `json:"name"`
	LastBootedAt *time.Time `json:"lastBootedAt"`
	ScriptID     uint       `json:"scriptId" gorm:"type:INT UNSIGNED REFERENCES scripts(id) ON DELETE RESTRICT ON UPDATE RESTRICT"`
	Script       File       `json:"script"`
}
