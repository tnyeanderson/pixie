package models

type CloudConfig struct {
	*FileEntry
}

func (c CloudConfig) LogLabel() string {
	return "cloudconfig"
}
