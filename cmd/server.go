package cmd

import (
	"log/slog"
	"os"

	"github.com/spf13/cobra"
	pixie "github.com/tnyeanderson/pixie/pkg"
	"gopkg.in/yaml.v3"
)

// serverCmd represents the server command
var serverCmd = &cobra.Command{
	Use:   "server",
	Short: "Start a pixie HTTP server and TFTP server.",
	Run: func(cmd *cobra.Command, args []string) {
		s := &pixie.Server{}
		if v := os.Getenv("PIXIE_CONFIG_FILE"); v != "" {
			b, err := os.ReadFile(v)
			if err != nil {
				slog.Error(err.Error())
				os.Exit(1)
			}
			if err := yaml.Unmarshal(b, s); err != nil {
				slog.Error(err.Error())
				os.Exit(1)
			}
		}
		if err := s.Listen(); err != nil {
			slog.Error(err.Error())
			os.Exit(1)
		}
	},
}

func init() {
	rootCmd.AddCommand(serverCmd)
}
