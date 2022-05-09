package models

type LoggableItem interface {
	LogLabel() (label string)
	LogItemCreated() (summary string, detail string)
	LogItemUpdated() (summary string, detail string)
	LogItemDeleted() (summary string, detail string)
}
