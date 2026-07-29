package pixie

import (
	"os"
	"testing"

	"github.com/go-test/deep"
)

func TestNewRenderConfig(t *testing.T) {
	// These would set at Server.Vars
	baseVars := Vars{
		"basevar1": "basevar1",
		"basevar2": "basevar2",
		"basevar3": "basevar3",
	}
	baseSecrets := Secrets{
		"basesecret1": {Value: "basesecret1"},
		"basesecret2": {Value: "basesecret2"},
		"basesecret3": {Value: "basesecret3"},
	}
	boot := &Boot{
		Vars: Vars{
			"bootvar1": "bootvar1",
			"bootvar2": "bootvar2",

			"basevar2": "bootvar2",
			"basevar3": "bootvar3",
		},
		Secrets: Secrets{
			"bootsecret1": {Value: "bootsecret1"},
			"bootsecret2": {Value: "bootsecret2"},

			"basesecret2": {Value: "bootsecret2"},
			"basesecret3": {Value: "bootsecret3"},
		},
	}
	device := &Device{
		Vars: Vars{
			"devicevar1": "devicevar1",

			"bootvar2": "devicevar2",

			"basevar3": "devicevar3",
		},
		Secrets: Secrets{
			"devicesecret1": {Value: "devicesecret1"},

			"bootsecret2": {Value: "devicesecret2"},

			"basesecret3": {Value: "devicesecret3"},
		},
	}

	got, err := NewRenderConfig(baseVars, baseSecrets, boot, device)
	if err != nil {
		t.Fatal(err)
	}

	expected := &RenderConfig{
		Boot:   boot,
		Device: device,
		Vars: Vars{
			// device vars override boot vars override base vars
			"basevar1": "basevar1",
			"basevar2": "bootvar2",
			"basevar3": "devicevar3",

			"bootvar1": "bootvar1",
			"bootvar2": "devicevar2",

			"devicevar1": "devicevar1",
		},
		Secrets: map[string]string{
			// device secrets override boot secrets override base secrets
			"basesecret1": "basesecret1",
			"basesecret2": "bootsecret2",
			"basesecret3": "devicesecret3",

			"bootsecret1": "bootsecret1",
			"bootsecret2": "devicesecret2",

			"devicesecret1": "devicesecret1",
		},
	}

	if diff := deep.Equal(got, expected); diff != nil {
		t.Fatal(diff)
	}
}

func TestSecret_values(t *testing.T) {
	s := Secrets{
		"raw":  {Value: "rawvalue"},
		"env":  {Env: "MY_ENV_VAR"},
		"file": {File: "testdata/mysecret.txt"},
	}

	os.Setenv("MY_ENV_VAR", "myenvsecret")

	got, err := s.values()
	if err != nil {
		t.Fatal(err)
	}

	expected := map[string]string{
		"raw":  "rawvalue",
		"env":  "myenvsecret",
		"file": "mysecretvalue",
	}

	if diff := deep.Equal(got, expected); diff != nil {
		t.Fatal(diff)
	}
}

func TestSecret_value(t *testing.T) {
	missingEnv := Secret{Env: "NON_EXIST_ENV_VAR"}
	if _, err := missingEnv.value(); err == nil {
		t.Fatal("expected error for missing env secret")
	}

	missingFile := Secret{File: "testdata/non-existent.txt"}
	if _, err := missingFile.value(); err == nil {
		t.Fatal("expected error for missing file secret")
	}

	missingAll := Secret{}
	if _, err := missingAll.value(); err == nil {
		t.Fatal("expected error for invalid secret ref")
	}
}
