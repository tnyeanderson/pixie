package queries

import (
	"database/sql"

	"github.com/tnyeanderson/ipxe-hub/db"
	"github.com/tnyeanderson/ipxe-hub/db/models"
)

func scriptsFromRows(rows *sql.Rows) ([]models.Script, error) {
	scripts := make([]models.Script, 0)

	for rows.Next() {
		script, err := scriptFromRow(rows)

		if err != nil {
			return nil, err
		}

		scripts = append(scripts, *script)
	}

	err := rows.Err()

	if err != nil {
		return nil, err
	}

	return scripts, nil
}

func scriptFromRow(rows *sql.Rows) (*models.Script, error) {
	script := models.Script{}

	err := rows.Scan(&script.Id, &script.Name, &script.Slug)

	if err != nil {
		return nil, err
	}

	return &script, nil
}

func GetScripts() ([]models.Script, error) {
	query := `
	SELECT script.id, script.name, script.slug
	from script
	`
	rows, err := db.Get().Query(query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	scripts, err := scriptsFromRows(rows)
	if err != nil {
		return nil, err
	}

	return scripts, nil
}

func AddScript(d *models.Script) (bool, error) {
	script := *d

	query := "INSERT INTO script (name, slug) VALUES (?, ?)"

	tx, err := db.Get().Begin()
	if err != nil {
		return false, err
	}

	stmt, err := tx.Prepare(query)

	if err != nil {
		return false, err
	}

	defer stmt.Close()

	_, err = stmt.Exec(script.Name, script.Slug)

	if err != nil {
		return false, err
	}

	tx.Commit()
	return true, nil
}
