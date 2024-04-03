package pixie

import (
	"maps"
	"strings"
	"text/template"
)

// Vars contains the variables available to templates rendered by pixie.
type Vars map[string]string

// Device is a device that will be booted using pixie.
type Device struct {
	Name string
	Mac  string
	Vars Vars
}

// Boot is an iPXE script, templatable with [Vars], that will be used for
// [Devices].
type Boot struct {
	Name    string
	Devices []Device
	Script  string
	Vars    Vars
}

// RenderConfig is what will be passed to [text/template] when a file is
// rendered.
type RenderConfig struct {
	Boot   *Boot
	Device *Device

	// Vars is the merged Vars map. See [NewRenderConfig] for details.
	Vars Vars
}

// NewRenderConfig returns a RenderConfig containing the boot and device, as
// well as the merged Vars map. Values in [device.Vars] override values in
// [boot.Vars], which override values in [baseVars].
func NewRenderConfig(baseVars map[string]string, boot *Boot, device *Device) *RenderConfig {
	vars := Vars{}
	mergeMaps(vars, baseVars, boot.Vars, device.Vars)
	return &RenderConfig{
		Boot:   boot,
		Device: device,
		Vars:   vars,
	}
}

// RenderFile renders the template at the path, providing the [r] to the
// template.
func (r *RenderConfig) RenderFile(path string) (string, error) {
	out := strings.Builder{}
	tmpl, err := template.ParseFiles(path)
	if err != nil {
		return "", err
	}
	tmpl.Option("missingkey=error")
	if err := tmpl.Execute(&out, *r); err != nil {
		return "", err
	}
	return out.String(), nil
}

// mergeMaps runs maps.Copy(dest, source) for each for each of the provided
// sources that are non-nil. Later sources will override values from previous
// sources.
func mergeMaps(dest map[string]string, sources ...map[string]string) {
	for _, src := range sources {
		if src != nil {
			maps.Copy(dest, src)
		}
	}
}
