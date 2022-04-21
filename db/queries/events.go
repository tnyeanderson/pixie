package queries

import (
	"errors"

	"github.com/tnyeanderson/pixie/db"
	"github.com/tnyeanderson/pixie/db/models"
)

func GetEvents() ([]models.Event, error) {
	var events []models.Event
	result := db.Get().Table("events").Select("*").Order("created_at DESC").Scan(&events)

	if result == nil {
		return nil, errors.New("error fetching events")
	}

	return events, nil
}

func AddEvent(event models.Event) (*models.Event, error) {
	result := db.Get().Create(&event)

	if result.Error != nil {
		return nil, result.Error
	}

	return &event, nil
}

func AddBootEvent(deviceID uint, scriptID uint) (*models.Event, error) {
	event := models.Event{Type: "BOOT", DeviceID: deviceID, ScriptID: scriptID}
	return AddEvent(event)
}
