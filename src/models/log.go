package models

type Log struct {
	BaseModel
	Event   string `json:"event"`
	Summary string `json:"summary"`
	Detail  string `json:"detail"`
}
