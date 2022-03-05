package main

import (
	"github.com/tnyeanderson/ipxe-hub/db"
	"github.com/tnyeanderson/ipxe-hub/server"
)

func main() {
	// Initialize
	db.Init()

	// Set up gin
	server.Init()

}
