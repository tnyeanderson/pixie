package api

import (
	"net/http"

	"github.com/tnyeanderson/ipxe-hub/db/models"
	"github.com/tnyeanderson/ipxe-hub/db/queries"
	"github.com/tnyeanderson/ipxe-hub/utils"
)

func GetAllScriptsHandler(rw http.ResponseWriter, r *http.Request) {
	scripts, err := queries.GetScripts()

	if err != nil {
		http.Error(rw, "Error getting scripts", http.StatusInternalServerError)
		return
	}

	utils.WriteJson(rw, scripts)
}

func AddScriptHandler(rw http.ResponseWriter, r *http.Request) {
	var script models.Script

	_, err := utils.ParseJson(&script, rw, r)

	if err != nil {
		// http error responses are sent by ParseJson
		return
	}

	success, err := queries.AddScript(&script)

	if !success || err != nil {
		http.Error(rw, "Failed to add script to database", http.StatusInternalServerError)
		return
	}
}
