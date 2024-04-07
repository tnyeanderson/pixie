package cmd

import (
	"fmt"
	"log/slog"
	"os"
	"os/signal"
	"syscall"

	"github.com/spf13/cobra"
	pixie "github.com/tnyeanderson/pixie/pkg"
	"gopkg.in/yaml.v3"
)

var serverCmd = &cobra.Command{
	Use:   "server",
	Short: "Start a pixie HTTP server and TFTP server.",
	Long: `Start a pixie HTTP server and TFTP server.

Set PIXIE_CONFIG_FILE=/path/to/config.yaml to load the server definition from a
YAML file.

Send a SIGUSR1 signal to reload the Boots and Devices fields from the config
file. The existing runtime values for these fields are replaced with the values
from the config file. Other fields are not reloaded, since they are immutable
at runtime.
`,
	Run: func(cmd *cobra.Command, args []string) {
		s, err := loadConfig()
		if err != nil {
			slog.Error(err.Error())
			os.Exit(1)
		}
		reloadConfigOnSIGUSR1(s)
		if err := s.Listen(); err != nil {
			slog.Error(err.Error())
			os.Exit(1)
		}
	},
}

func loadConfig() (*pixie.Server, error) {
	confFile := os.Getenv("PIXIE_CONFIG_FILE")
	if confFile == "" {
		return &pixie.Server{}, nil
	}

	slog.Info("loading config file", "path", confFile)
	b, err := os.ReadFile(confFile)
	if err != nil {
		return nil, err
	}

	s := &pixie.Server{}
	if err := yaml.Unmarshal(b, s); err != nil {
		return nil, err
	}

	return s, nil
}

func reloadConfig(s *pixie.Server) error {
	newConf, err := loadConfig()
	if err != nil {
		return err
	}
	// Only allow setting Boots and Vars at runtime
	s.Boots = newConf.Boots
	s.Vars = newConf.Vars
	return nil
}

func reloadConfigOnSIGUSR1(s *pixie.Server) {
	c := make(chan os.Signal, 1)
	signal.Notify(c, syscall.SIGUSR1)
	go func() {
		for {
			sig := <-c // block until SIGUSR1 received
			slog.Info(fmt.Sprintf("got signal: %s", sig))
			if err := reloadConfig(s); err != nil {
				slog.Error(err.Error())
			}
			slog.Info("reloaded config", "config", s)
		}
	}()
}

func init() {
	rootCmd.AddCommand(serverCmd)
}
