package config

type Group struct {
	Name    string
	Script  Script
	Devices []Device `yaml:",omitempty"`
	Vars    *Vars    `yaml:",omitempty"`
}
