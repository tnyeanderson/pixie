package models

import (
	"fmt"

	"github.com/tnyeanderson/pixie/types"
	"github.com/tnyeanderson/pixie/utils"
	"gorm.io/gorm"
)

type FileEntry struct {
	gorm.Model
	Name         string `gorm:"unique"`
	Path         string `gorm:"unique;not null"`
	LastAccessed types.NullTime
}

func (f FileEntry) LogLabel() string {
	return "file"
}

func (f FileEntry) LogItemCreated() (summary string, detail string) {
	summary = fmt.Sprintf("Added %s: ID=%d, Path=%s", f.LogLabel(), f.ID, f.Path)
	detail = utils.Jsonify(f)
	return summary, detail
}

func (f FileEntry) LogItemUpdated() (summary string, detail string) {
	summary = fmt.Sprintf("Updated %s: ID=%d, Path=%s", f.LogLabel(), f.ID, f.Path)
	detail = utils.Jsonify(f)
	return summary, detail
}

func (f FileEntry) LogItemDeleted() (summary string, detail string) {
	summary = fmt.Sprintf("Deleted %T: ID=%d, Path=%s", f.LogLabel(), f.ID, f.Path)
	detail = utils.Jsonify(f)
	return summary, detail
}
