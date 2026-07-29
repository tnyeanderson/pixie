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
			"basevar1": "baseval1",
			"basevar2": "baseval2",
		},
		Secrets: Secrets{
			"basesecret1": Secret{Value: "baseval1"},
			"basesecret2": Secret{Value: "baseval2"},
		},
		Boots: []Boot{
			{
				Script:     "inline test {{ .Device.Mac }}\n",
				ScriptPath: "/this/will/be/ignored",
				Devices: []Device{
					{Mac: "33:33:33:33:33:33"},
				},
			},
			{
				ScriptPath: "testscript.ipxe",
				Devices: []Device{
					{Mac: "44:44:44:44:44:44"},
				},
			},
			{
				ScriptPath: "testscript.ipxe",
				Vars: Vars{
					"basevar2": "bootval2",
				},
				Secrets: Secrets{
					"basesecret2": Secret{Value: "bootval2"},
				},
				Devices: []Device{
					{Mac: "99:88:77:66:55:44"},
				},
			},
			{
				ScriptPath: "testscript.ipxe",
				Vars: Vars{
					"myvar1":   "hello",
					"myvar2":   "earth",
					"basevar1": "bootval1",
					"basevar2": "bootval2",
				},
				Secrets: Secrets{
					"basesecret1": Secret{Value: "bootval1"},
					"basesecret2": Secret{Value: "bootval2"},
				},
				Devices: []Device{
					{
						Mac: "11:22:33:44:55:66",
						Vars: Vars{
							"myvar2":   "mars",
							"basevar1": "newval1",
						},
						Secrets: Secrets{
							"basesecret1": Secret{Value: "newval1"},
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

func ExampleRenderConfig_Render() {
	s := &Server{}
	// tested above
	yaml.Unmarshal(serverYAML, s)
	macs := []string{
		"33:33:33:33:33:33",
		"44:44:44:44:44:44",
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
	// mac         = 44:44:44:44:44:44
	// basevar1    = "baseval1"
	// basevar2    = "baseval2"
	// basesecret1 = "baseval1"
	// basesecret2 = "baseval2"
	// myvar1      = ""
	// myvar2      = ""
	// end of script
	//
	// non-working ipxe test script
	// mac         = 99:88:77:66:55:44
	// basevar1    = "baseval1"
	// basevar2    = "bootval2"
	// basesecret1 = "baseval1"
	// basesecret2 = "bootval2"
	// myvar1      = ""
	// myvar2      = ""
	// end of script
	//
	// non-working ipxe test script
	// mac         = 11:22:33:44:55:66
	// basevar1    = "newval1"
	// basevar2    = "bootval2"
	// basesecret1 = "newval1"
	// basesecret2 = "bootval2"
	// myvar1      = "hello"
	// myvar2      = "mars"
	// end of script
}
