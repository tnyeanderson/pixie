package pixie

import (
	"maps"
	"strings"
	"text/template"
)

// Device is a device that will be booted using pixie.
type Device struct {
	Name string
	Mac  string
	Vars map[string]string
}

// Boot is an iPXE script, templatable with [Vars], that will be used for
// [Devices].
type Boot struct {
	Name    string
	Devices []Device
	Script  string
	Vars    map[string]string
}

func (b *Boot) renderFile(path string, device *Device) (string, error) {
	renderConfig := NewRenderConfig(b, device)

	out := strings.Builder{}
	tmpl, err := template.ParseFiles(path)
	if err != nil {
		return "", err
	}
	tmpl.Option("missingkey=error")
	if err := tmpl.Execute(&out, *renderConfig); err != nil {
		return "", err
	}
	return out.String(), nil
}

// RenderConfig is what will be passed to [text/template] when a file is
// rendered.
type RenderConfig struct {
	Boot   *Boot
	Device *Device
	Vars   map[string]string
}

// NewRenderConfig returns a RenderConfig containing the boot and device, as
// well as the merged Vars map.
func NewRenderConfig(boot *Boot, device *Device) *RenderConfig {
	// Overlay the variables from device onto boot
	vars := maps.Clone(boot.Vars)
	maps.Copy(vars, device.Vars)
	return &RenderConfig{
		Boot:   boot,
		Device: device,
		Vars:   vars,
	}
}
