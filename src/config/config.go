package config

import (
	"fmt"
	"os"
	"path"
	"strings"
	"text/template"

	"gopkg.in/yaml.v3"
)

type Config struct {
	StaticRoot string   `yaml:"staticRoot,omitempty"`
	Devices    []Device `yaml:",omitempty"`
	Groups     []Group  `yaml:",omitempty"`
	Scripts    []Script `yaml:",omitempty"`
	Vars       *Vars    `yaml:",omitempty"`
	Resolved   Devices  `yaml:"-"`
}

func (c *Config) Load(path string) error {
	b, err := os.ReadFile(path)
	if err != nil {
		return err
	}
	err = yaml.Unmarshal(b, &c)
	if err != nil {
		return err
	}
	c.resolveDevices()
	return nil
}

func (c *Config) Export() ([]byte, error) {
	return yaml.Marshal(c)
}

func (c *Config) RenderScript(d Device, staticRoot string) (string, error) {
	out := strings.Builder{}
	subpath := d.Script.Path
	if subpath == "" {
		if defaultScript := c.defaultScript(); defaultScript != nil {
			subpath = defaultScript.Path
		}
	}
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

func (c *Config) defaultScript() *Script {
	for _, s := range c.Scripts {
		if s.Name == "default" {
			return &s
		}
	}
	return nil
}

func (c *Config) resolveDevices() {
	devices := Devices{}
	for _, d := range c.Devices {
		d.Script = c.lookupScript(d)
		d.Vars = c.resolveVars(d)
		devices[d.Mac] = d
	}
	c.Resolved = devices
}

func (c *Config) lookupGroup(d Device) *Group {
	for _, g := range c.Groups {
		if g.Name == d.Group {
			return &g
		}
	}
	return nil
}

// Get a script that has a path from one that may not
func (c *Config) resolveScript(s Script) *Script {
	if s.Path != "" {
		return &s
	}
	for _, cs := range c.Scripts {
		if cs.Name == s.Name {
			return &cs
		}
	}
	return nil
}

func (c *Config) resolveVars(d Device) *Vars {
	vars := Vars{}

	// Top-level vars
	if c.Vars != nil {
		for k, v := range *c.Vars {
			vars[k] = v
		}
	}

	// Group vars
	g := c.lookupGroup(d)
	if g != nil {
		for k, v := range *g.Vars {
			vars[k] = v
		}
	}

	// Device vars
	if d.Vars != nil {
		for k, v := range *d.Vars {
			vars[k] = v
		}
	}

	return &vars
}

func (c *Config) lookupScript(d Device) *Script {
	if d.Script != nil {
		if d.Script.Path != "" {
			return d.Script
		}
		return c.resolveScript(*d.Script)
	}
	g := c.lookupGroup(d)
	if g != nil {
		return c.resolveScript(g.Script)
	}
	return nil
}

func (c *Config) GetScriptPath(mac string) string {
	d, ok := c.Resolved[mac]
	if !ok || d.Script == nil {
		return ""
	}
	return d.Script.Path
}
