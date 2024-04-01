package pixie

import (
	"fmt"
	"maps"
	"path"
	"strings"
	"text/template"
)

type Vars map[string]string

type Script struct {
	Name string
	Path string
}

type Device struct {
	Name string
	Mac  string
	Vars Vars
}

func (d *Device) renderFile(path string, baseVars Vars) (string, error) {
	// Make a copy of the device so we can resolve the vars
	dev := d
	v := maps.Clone(baseVars)
	maps.Copy(v, d.Vars)
	dev.Vars = v

	out := strings.Builder{}
	tmpl, err := template.ParseFiles(path)
	tmpl.Option("missingkey=error")
	if err != nil {
		return "", err
	}
	err = tmpl.Execute(&out, *dev)
	if err != nil {
		return "", err
	}
	return out.String(), nil
}

type Boot struct {
	Name    string
	Devices []Device
	Script  Script
	Vars    Vars
}

func (b *Boot) renderScript(staticRoot string, device Device) (string, error) {
	subpath := b.Script.Path
	// TODO:
	//if subpath == "" {
	//	if defaultScript := c.defaultScript(); defaultScript != nil {
	//		subpath = defaultScript.Path
	//	}
	//}
	if subpath == "" {
		return "", fmt.Errorf("path can not be empty: %s", subpath)
	}
	fullpath := path.Join(staticRoot, subpath)
	return device.renderFile(fullpath, b.Vars)
}
