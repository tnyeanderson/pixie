package config

import (
	"strings"
	"text/template"
)

type Device struct {
	Name   string  `yaml:",omitempty"`
	Mac    string  `yaml:",omitempty"`
	Group  string  `yaml:",omitempty"`
	Script *Script `yaml:",omitempty"`
	Vars   *Vars   `yaml:",omitempty"`
}

type Devices map[string]Device

func (d *Device) RenderFile(fullpath string) (string, error) {
	out := strings.Builder{}
	tmpl, err := template.ParseFiles(fullpath)
	tmpl.Option("missingkey=error")
	if err != nil {
		return "", err
	}
	err = tmpl.Execute(&out, *d)
	if err != nil {
		return "", err
	}
	return out.String(), nil
}
