package config

import (
	"fmt"
	"path"
	"strings"
	"text/template"
)

type Device struct {
	Name   string  `yaml:",omitempty"`
	Mac    string  `yaml:",omitempty"`
	Script *Script `yaml:",omitempty"`
	Vars   *Vars   `yaml:",omitempty"`
}

type Devices map[string]Device

func (d *Device) RenderScript(staticRoot string) (string, error) {
	subpath := d.Script.Path
	out := strings.Builder{}
	if subpath == "" {
		return "", fmt.Errorf("path can not be empty: %s", subpath)
	}
	fullpath := path.Join(staticRoot, subpath)
	tmpl, err := template.ParseFiles(fullpath)
	if err != nil {
		return "", err
	}
	err = tmpl.Execute(&out, d)
	if err != nil {
		return "", err
	}
	return out.String(), nil
}
