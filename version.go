package main

import (
	"runtime/debug"
	"strings"

	_ "embed"
)

// TODO: Use goreleaser

//go:embed VERSION
var versionTag string

func getCommit() string {
	if info, ok := debug.ReadBuildInfo(); ok {
		for _, setting := range info.Settings {
			if setting.Key == "vcs.revision" {
				return setting.Value
			}
		}
	}
	return ""
}

func version() string {
	s := strings.TrimSpace(versionTag)
	if c := getCommit(); c != "" {
		s += " commit:" + c
	}
	return s
}
