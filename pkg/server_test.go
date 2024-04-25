package pixie

import (
	"fmt"
	"os"
	"testing"

	"github.com/go-test/deep"
	"gopkg.in/yaml.v3"
)

var serverYAML []byte

func init() {
	b, err := os.ReadFile("testdata/server.yaml")
	if err != nil {
		panic("cannot read example server.yaml file")
	}
	serverYAML = b
}

func TestUnmarshalServer(t *testing.T) {
	s := &Server{}
	if err := yaml.Unmarshal(serverYAML, s); err != nil {
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
				Script:     "inline test {{ .Device.Mac }}\n",
				ScriptPath: "/this/will/be/ignored",
				Devices: []Device{
					Device{
						Mac: "33:33:33:33:33:33",
					},
				},
			},
			Boot{
				ScriptPath: "testscript.ipxe",
				Devices: []Device{
					Device{
						Mac: "99:88:77:66:55:44",
					},
				},
			},
			Boot{
				ScriptPath: "testscript.ipxe",
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
	// tested above
	yaml.Unmarshal(serverYAML, s)
	macs := []string{
		"33:33:33:33:33:33",
		"99:88:77:66:55:44",
		"11:22:33:44:55:66",
	}
	for _, mac := range macs {
		out, err := s.RenderScript(mac)
		if err != nil {
			panic(err.Error())
		}
		fmt.Println(out)
	}

	// Output:
	// inline test 33:33:33:33:33:33
	//
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
