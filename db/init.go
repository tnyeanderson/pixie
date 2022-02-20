package db

func createDeviceTable() {
	// create table if not exists
	table := `
	CREATE TABLE IF NOT EXISTS device(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		mac TEXT UNIQUE NOT NULL,
		name TEXT,
		groupname TEXT,
		script INT,
		CONSTRAINT fk_script FOREIGN KEY (script) REFERENCES script (id)
	);
	`
	_, err := Get().Exec(table)
	if err != nil {
		panic(err)
	}
}

func createScriptTable() {
	// create table if not exists
	table := `
	CREATE TABLE IF NOT EXISTS script(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT,
		slug TEXT UNIQUE NOT NULL
	);
	`
	_, err := Get().Exec(table)
	if err != nil {
		panic(err)
	}
}

func Init() {
	createScriptTable()
	createDeviceTable()
}
