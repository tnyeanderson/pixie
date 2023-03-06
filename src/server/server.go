package server

import (
	"github.com/tnyeanderson/pixie/api"
)

func ListenHTTP() {
	r := api.NewRouter()
	r.Run(":8880")
}
