package models

type Setting struct {
	BaseModel
	Key          string `json:"key" gorm:"unique"`
	Value        string `json:"value"`
	DefaultValue string `json:"defaultValue"`
}
