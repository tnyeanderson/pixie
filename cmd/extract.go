package cmd

import (
	"io"
	"os"
	"path/filepath"

	"github.com/diskfs/go-diskfs"
	"github.com/diskfs/go-diskfs/filesystem"
	"github.com/spf13/cobra"
)

var extractCmd = &cobra.Command{
	Use:   "extract isofile",
	Args:  cobra.ExactArgs(1),
	Short: "Extract initrd and vmlinuz from an Ubuntu Server ISO image.",
	RunE: func(cmd *cobra.Command, args []string) error {
		isofile := args[0]
		return extract(path, filepath.Dir(isofile))
	},
}

func extract(pathToISO, outputDir string) error {
	d, err := diskfs.Open(pathToISO)
	if err != nil {
		return err
	}

	fs, err := d.GetFilesystem(0) // assuming it is the whole disk, so partition = 0
	if err != nil {
		return err
	}

	files := []string{"vmlinuz", "initrd"}

	for _, f := range files {
		src := "/casper/" + f
		dest := filepath.Join(outputDir, f)
		if err := extractFileFromISO(fs, src, dest); err != nil {
			return err
		}
	}

	return nil
}

func extractFileFromISO(fs filesystem.FileSystem, src string, dest string) error {
	r, err := fs.OpenFile(src, os.O_RDONLY)
	if err != nil {
		return err
	}

	w, err := os.Create(dest)
	if err != nil {
		return err
	}

	if _, err := io.Copy(w, r); err != nil {
		return err
	}

	return nil
}

func init() {
	rootCmd.AddCommand(extractCmd)
}
