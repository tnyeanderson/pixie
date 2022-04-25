package config

import (
	_ "embed"
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"strings"

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

func init() {
	loadDefaults()

	readUserConfig()

	fmt.Printf("%+v\n", Pixie)

	if err := validateConfig(); err != nil {
		fmt.Println("CONFIG ERROR: ", err.Error())
		os.Exit(1)
	}
}

func readUserConfig() {
	content, err := readConfigFile(Pixie.Paths.ConfigFile)
	if err != nil {
		fmt.Println(err.Error())
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
	if !strings.HasPrefix(Pixie.Paths.Scripts, Pixie.Paths.FileServer) {
		return errors.New("Paths.Scripts must start with Paths.FileServer")
	}
	if !strings.HasPrefix(Pixie.Paths.Images, Pixie.Paths.FileServer) {
		return errors.New("Paths.Images must start with Paths.FileServer")
	}
	return nil
}
