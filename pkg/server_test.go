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
httplistener: ":1234"
tftplistener: ":6969"
vars:
  basevar: baseval
boots:
- script: testscript.ipxe
  devices:
  - mac: 99:88:77:66:55:44
- script: testscript.ipxe
  vars:
    myvar1: hello
    myvar2: earth
  devices:
  - mac: 11:22:33:44:55:66
    vars:
      myvar2: mars
      basevar: newval
`
}

func TestUnmarshalServer(t *testing.T) {
	s := &Server{}
	b := []byte(getTestServerYAML())
	if err := yaml.Unmarshal(b, s); err != nil {
		t.Fatal(err)
	}
	expected := &Server{
		StaticRoot:   "testdata",
		HTTPListener: ":1234",
		TFTPListener: ":6969",
		Vars: Vars{
			"basevar": "baseval",
		},
		Boots: []Boot{
			Boot{
				Script: "testscript.ipxe",
				Devices: []Device{
					Device{
						Mac: "99:88:77:66:55:44",
					},
				},
			},
			Boot{
				Script: "testscript.ipxe",
				Vars: Vars{
					"myvar1": "hello",
					"myvar2": "earth",
				},
				Devices: []Device{
					Device{
						Mac: "11:22:33:44:55:66",
						Vars: Vars{
							"myvar2":  "mars",
							"basevar": "newval",
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
	s := &Server{}
	b := []byte(getTestServerYAML())
	// tested above
	yaml.Unmarshal(b, s)
	for _, mac := range []string{"99:88:77:66:55:44", "11:22:33:44:55:66"} {
		out, err := s.RenderScript(mac)
		if err != nil {
			panic(err.Error())
		}
		fmt.Println(out)
	}

	// Output:
	// non-working ipxe test script
	// mac     = 99:88:77:66:55:44
	// basevar = "baseval"
	// myvar1  = ""
	// myvar2  = ""
	// end of script
	//
	// non-working ipxe test script
	// mac     = 11:22:33:44:55:66
	// basevar = "newval"
	// myvar1  = "hello"
	// myvar2  = "mars"
	// end of script
	//
}
