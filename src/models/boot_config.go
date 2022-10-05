package models

type BootConfig struct {
	BaseModel
	Name string `json:"name"  gorm:"unique"`
	// JSON encoded configuration parameters that will be passed to the template
	Config string `json:"config"`
}
