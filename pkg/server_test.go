package pixie

import (
	"fmt"
	"testing"

	"github.com/go-test/deep"
	"gopkg.in/yaml.v3"
)

func getTestServerYAML() string {
	return `---
staticroot: testdata
boots:
- script: testscript.ipxe
  vars:
    myvar1: hello
    myvar2: earth
  devices:
  - mac: 11:22:33:44:55:66
    vars:
      myvar2: mars
`
}

func TestUnmarshalServer(t *testing.T) {
	s := &Server{}
	b := []byte(getTestServerYAML())
	if err := yaml.Unmarshal(b, s); err != nil {
		t.Fatal(err)
	}
	expected := &Server{
		StaticRoot: "testdata",
		Boots: []Boot{
			Boot{
				Script: "testscript.ipxe",
				Vars: map[string]string{
					"myvar1": "hello",
					"myvar2": "earth",
				},
				Devices: []Device{
					Device{
						Mac: "11:22:33:44:55:66",
						Vars: map[string]string{
							"myvar2": "mars",
						},
					},
				},
			},
		},
	}

	if diff := deep.Equal(s, expected); diff != nil {
		t.Fatalf("unmarshaled YAML config is incorrect: %v", diff)
	}
}

func ExampleRenderScript() {
	mac := "11:22:33:44:55:66"
	s := &Server{}
	b := []byte(getTestServerYAML())
	// tested above
	yaml.Unmarshal(b, s)
	out, _ := s.RenderScript(mac)
	fmt.Println(out)

	// Output:
	// non-working ipxe test script
	// hello
	// mars
}
