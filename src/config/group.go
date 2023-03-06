package config

type Group struct {
	Name   string
	Script Script
	Vars   *Vars `yaml:",omitempty"`
}
