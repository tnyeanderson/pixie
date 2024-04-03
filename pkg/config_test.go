package pixie

import (
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
	boot := &Boot{
		Vars: Vars{
			"bootvar1": "bootvar1",
			"bootvar2": "bootvar2",

			"basevar2": "bootvar2",
			"basevar3": "bootvar3",
		},
	}
	device := &Device{
		Vars: Vars{
			"devicevar1": "devicevar1",

			"bootvar2": "devicevar2",

			"basevar3": "devicevar3",
		},
	}

	got := NewRenderConfig(baseVars, boot, device)

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
	}

	if diff := deep.Equal(got, expected); diff != nil {
		t.Fatal(diff)
	}
}
