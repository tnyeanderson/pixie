package db

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

var _DB *sql.DB

func ConnectDatabase() error {
	db, err := sql.Open("sqlite3", "./ipxe-hub.db")
	if err != nil {
		return err
	}

	_DB = db
	return nil
}

func Get() *sql.DB {
	if _DB == nil {
		ConnectDatabase()
	}

	return _DB
}
