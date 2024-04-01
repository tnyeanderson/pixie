package cmd

import (
	"log/slog"
	"os"

	"github.com/spf13/cobra"
	pixie "github.com/tnyeanderson/pixie/pkg"
)

// serverCmd represents the server command
var serverCmd = &cobra.Command{
	Use:   "server",
	Short: "Start a pixie HTTP server and TFTP server.",
	Run: func(cmd *cobra.Command, args []string) {
		s := pixie.Server{
			// TODO: fix
			HTTPListener: ":8869",
			TFTPListener: ":6969",
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
