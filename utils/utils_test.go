package utils

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/tnyeanderson/pixie/config"
)

func TestIsScriptPath(t *testing.T) {
	var configMock = config.ConfigModel{}

	assert := assert.New(t)
	dir := "test/scripts"

	configMock.Paths.Scripts = dir

	var tests = []struct {
		input    string
		expected bool
	}{
		{"anything", false},
		{"badsubpath/anything", false},
		{dir, false},
		{dir + "anything", false},
		{dir + "/anything", true},
	}

	for _, test := range tests {
		assert.Equal(test.expected, IsScriptPath(test.input, configMock))
	}
}

func TestIsImagePath(t *testing.T) {
	var configMock = config.ConfigModel{}

	assert := assert.New(t)
	dir := "test/images"

	configMock.Paths.Images = dir

	var tests = []struct {
		input    string
		expected bool
	}{
		{"anything", false},
		{"badsubpath/anything", false},
		{dir, false},
		{dir + "anything", false},
		{dir + "/anything", true},
	}

	for _, test := range tests {
		assert.Equal(test.expected, IsImagePath(test.input, configMock))
	}
}

func TestIsCloudConfigPath(t *testing.T) {
	var configMock = config.ConfigModel{}

	assert := assert.New(t)
	dir := "test/cloudconfigs"

	configMock.Paths.CloudConfigs = dir

	var tests = []struct {
		input    string
		expected bool
	}{
		{"anything", false},
		{"badsubpath/anything", false},
		{dir, false},
		{dir + "anything", false},
		{dir + "/anything", true},
	}

	for _, test := range tests {
		assert.Equal(test.expected, IsCloudConfigPath(test.input, configMock))
	}
}
