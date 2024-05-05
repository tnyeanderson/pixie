package main

import (
	"log/slog"
	"os"

	"github.com/tnyeanderson/pixie/cmd"
)

func main() {
	slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, nil)))

	cmd.SetVersion(version())
	cmd.Execute()
}
