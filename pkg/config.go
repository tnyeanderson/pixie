package pixie

import (
	"errors"
	"fmt"
	"maps"
	"os"
	"strings"
	"text/template"
)

// Vars contains the variables available to templates rendered by pixie.
type Vars map[string]string

// Secrets is a map where the key is the secret name and the value is the
// secret reference.
type Secrets map[string]Secret

// values returns a map of the values derived from the Secrets.
func (s *Secrets) values() (map[string]string, error) {
	out := map[string]string{}
	for name, ref := range *s {
		value, err := ref.value()
		if err != nil {
			return nil, errors.Join(fmt.Errorf("invalid secret reference for %s", name), err)
		}
		out[name] = value
	}
	return out, nil
}

// Secret contains the secret reference.
type Secret struct {
	// Env is an environment variable name.
	Env string

	// File is a filesystem path from which the secret will be read. Leading and
	// trailing whitespace will be trimmed from the value.
	File string

	// Value will be used as-is if provided, otherwise it will be derived from
	// Env or Path.
	Value string
}

// value returns the value derived from the Secret reference. For file-based
// secrets, strings.TrimSpace() is used on the value before returning.
func (s *Secret) value() (string, error) {
	if s.Value != "" {
		return s.Value, nil
	}
	if s.Env != "" {
		v, ok := os.LookupEnv(s.Env)
		if !ok {
			return "", fmt.Errorf("missing environment variable: %s", s.Env)
		}
		return v, nil
	}
	if s.File != "" {
		b, err := os.ReadFile(s.File)
		if err != nil {
			return "", err
		}
		return strings.TrimSpace(string(b)), nil
	}
	return "", fmt.Errorf("no reference defined")
}

// Device is a device that will be booted using pixie.
type Device struct {
	Name    string
	Mac     string
	Secrets Secrets
	Vars    Vars
}

// Boot is an iPXE script, templatable with Vars, that will be used for each of
// the Devices.  If Script is not empty, its contents will be used.  Otherwise,
// the contents are loaded from ScriptPath.
type Boot struct {
	Name       string
	Devices    []Device
	Script     string
	ScriptPath string
	Secrets    Secrets
	Vars       Vars
}

// RenderConfig is what will be passed to [text/template] when a file is
// rendered.
type RenderConfig struct {
	Boot   *Boot
	Device *Device

	// Vars is the merged Vars map. See [NewRenderConfig] for details.
	Vars Vars

	// Secrets is the merged Secrets map. See [NewRenderConfig] for details.
	Secrets map[string]string
}

// NewRenderConfig returns a RenderConfig containing the
// boot and device, as well as the merged Vars and
// Secrets map. When Vars and Secrets maps are merged,
// precedence is (last wins): base, boot, device.
func NewRenderConfig(baseVars map[string]string, baseSecrets Secrets, boot *Boot, device *Device) (*RenderConfig, error) {
	vars := Vars{}
	mergeMaps(vars, baseVars, boot.Vars, device.Vars)

	secrets, err := mergeSecrets(baseSecrets, boot.Secrets, device.Secrets)
	if err != nil {
		return nil, err
	}

	return &RenderConfig{
		Boot:    boot,
		Device:  device,
		Vars:    vars,
		Secrets: secrets,
	}, nil
}

// Render renders the template content tmpl, providing the r as data.
func (r *RenderConfig) Render(tmpl []byte) (string, error) {
	out := strings.Builder{}
	t := template.New("t")
	if _, err := t.Parse(string(tmpl)); err != nil {
		return "", err
	}
	t.Option("missingkey=error")
	if err := t.Execute(&out, *r); err != nil {
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

// mergeSecrets runs mergeMaps for each non-nil
// secrets.values(). Later sources will override values
// from previous sources.
func mergeSecrets(secrets ...Secrets) (map[string]string, error) {
	out := map[string]string{}
	for _, s := range secrets {
		if s != nil {
			v, err := s.values()
			if err != nil {
				return nil, err
			}
			mergeMaps(out, v)
		}
	}
	return out, nil
}
