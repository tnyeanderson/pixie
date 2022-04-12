package config

import (
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"strings"

	"gopkg.in/yaml.v2"
)

var Pixie = ConfigModel{}

func loadDefaults() {
	Pixie.Paths.Api = "/api/v1"
	Pixie.Paths.ConfigFile = "data/pixie.yaml"
	Pixie.Paths.Database = "data/pixie.db"
	Pixie.Paths.FileServer = "data/files"
	Pixie.Paths.Scripts = "data/files/scripts"
	Pixie.Paths.Images = "data/files/images"
	Pixie.Paths.FallbackScript = "defaults/shell.ipxe"
	Pixie.Paths.WebRoot = "web/dist/html"
	Pixie.AccessModes.FileDefault = uint32(0660)
	Pixie.AccessModes.DirDefault = uint32(0770)
}

func init() {
	loadDefaults()

	if err := readConfigFile(Pixie.Paths.ConfigFile); err != nil {
		fmt.Println(err.Error())
		fmt.Println("Loading default config")
	}

	fmt.Printf("%+v\n", Pixie)

	if err := validateConfig(); err != nil {
		fmt.Println("CONFIG ERROR: ", err.Error())
		os.Exit(1)
	}
}

func readConfigFile(file string) error {
	contents, err := ioutil.ReadFile(file)
	if err != nil {
		return errors.New("Unable to read config file: " + err.Error())
	}
	err = yaml.Unmarshal(contents, &Pixie)
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
