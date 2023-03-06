package config

type Device struct {
	Name   string  `yaml:",omitempty"`
	Mac    string  `yaml:",omitempty"`
	Script *Script `yaml:",omitempty"`
	Vars   *Vars   `yaml:",omitempty"`
}

type Devices map[string]Device
