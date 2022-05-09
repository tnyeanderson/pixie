package queries

import (
	"errors"

	"github.com/tnyeanderson/pixie/db"
	"github.com/tnyeanderson/pixie/db/models"
)

func GetLogs() ([]models.Log, error) {
	var logs []models.Log
	result := db.Get().Table("logs").Select("*").Order("created_at DESC").Scan(&logs)

	if result == nil {
		return nil, errors.New("error fetching logs")
	}

	return logs, nil
}

func AddLog(log models.Log) (*models.Log, error) {
	result := db.Get().Create(&log)

	if result.Error != nil {
		return nil, result.Error
	}

	return &log, nil
}

func AddLogMessage(logtype string, summary string, detail string) (*models.Log, error) {
	log := models.Log{Type: logtype, Summary: summary, Detail: detail}
	return AddLog(log)
}

func LogCreationOfFile(f models.LoggableItem) {
	summary, detail := f.LogItemCreated()
	AddLogMessage("CREATE", summary, detail)
}

func LogUpdationOfFile(f models.LoggableItem) {
	summary, detail := f.LogItemUpdated()
	AddLogMessage("UPDATE", summary, detail)
}

func LogDeletionOfFile(f models.LoggableItem) {
	summary, detail := f.LogItemDeleted()
	AddLogMessage("DELETE", summary, detail)
}
