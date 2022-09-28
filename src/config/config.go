package config

import (
	_ "embed"
	"errors"
	"flag"
	"fmt"
	"io/ioutil"
	"os"

	"gopkg.in/yaml.v2"
)

var Pixie = ConfigModel{}

//go:embed default.yaml
var defaultConfigYaml []byte

func loadDefaults() {
	err := parseConfigYaml(defaultConfigYaml)
	if err != nil {
		fmt.Println("Error parsing default config: ", err.Error())
		os.Exit(1)
	}
}

func Initialize() {
	loadConfig()
	printConfig()
	mustValidate()
}

func loadConfig() {
	loadDefaults()
	parseConfigFileFlag()
	readUserConfig()
}

func parseConfigFileFlag() {
	flag.StringVar(&Pixie.Paths.ConfigFile, "config-file", Pixie.Paths.ConfigFile, "path to config file")
	flag.Parse()
}

func printConfig() {
	fmt.Printf("%+v\n", Pixie)
}

func readUserConfig() {
	configpath := Pixie.Paths.ConfigFile
	content, err := readConfigFile(configpath)
	if err != nil {
		fmt.Println("User config not found or could not be read: ", configpath)
		fmt.Println("Using default config")
	} else {
		if err := parseConfigYaml(content); err != nil {
			fmt.Println(err.Error())
			fmt.Println("Using default config")
		}
	}
}

func readConfigFile(file string) ([]byte, error) {
	contents, err := ioutil.ReadFile(file)
	if err != nil {
		return nil, errors.New("Unable to read config file: " + err.Error())
	}
	return contents, nil
}

func parseConfigYaml(content []byte) error {
	err := yaml.UnmarshalStrict(content, &Pixie)
	if err != nil {
		return errors.New("Unable to parse config file: " + err.Error())
	}
	return nil
}

func validateConfig() error {
	// Put any required validation here
	return nil
}

func mustValidate() {
	if err := validateConfig(); err != nil {
		fmt.Println("CONFIG ERROR: ", err.Error())
		os.Exit(1)
	}
}
