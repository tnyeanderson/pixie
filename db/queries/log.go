package queries

import (
	"errors"
	"fmt"

	"github.com/tnyeanderson/ipxe-hub/db"
	"github.com/tnyeanderson/ipxe-hub/db/models"
)

func GetLogs() ([]models.Log, error) {
	var logs []models.Log
	result := db.Get().Joins("Log").Find(&logs)

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

	fmt.Println("Added log: ", log)

	return &log, nil
}

func AddLogMessage(summary string, detail string) (*models.Log, error) {
	log := models.Log{Summary: summary, Detail: detail}
	fmt.Println("Adding log: ", log)
	return AddLog(log)
}
