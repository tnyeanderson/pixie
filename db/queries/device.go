package queries

import (
	"database/sql"
	"errors"

	"github.com/tnyeanderson/ipxe-hub/db"
	"github.com/tnyeanderson/ipxe-hub/db/models"
)

func devicesFromRows(rows *sql.Rows) ([]models.Device, error) {
	devices := make([]models.Device, 0)

	for rows.Next() {
		device, err := deviceFromRow(rows)

		if err != nil {
			return nil, err
		}

		devices = append(devices, *device)
	}

	err := rows.Err()

	if err != nil {
		return nil, err
	}

	return devices, nil
}

func deviceFromRow(rows *sql.Rows) (*models.Device, error) {
	device := models.Device{}
	device.Script = models.Script{}

	err := rows.Scan(&device.Id, &device.Mac, &device.Name, &device.GroupName, &device.Script.Id, &device.Script.Name, &device.Script.Slug)

	if err != nil {
		return nil, err
	}

	return &device, nil
}

func GetDevices() ([]models.Device, error) {
	query := `
	SELECT device.id, device.mac, device.name, device.groupname, script.id, script.name, script.slug
	from device
	left join script on script.id = device.script
	`
	rows, err := db.Get().Query(query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	devices, err := devicesFromRows(rows)
	if err != nil {
		return nil, err
	}

	return devices, nil
}

func GetDeviceByMac(mac string) (*models.Device, error) {
	query := `
	SELECT device.id, device.mac, device.name, device.groupname, script.id, script.name, script.slug
	from device
	left join script on script.id = device.script
	WHERE device.mac = ?
	`

	stmt, err := db.Get().Prepare(query)
	if err != nil {
		return nil, err
	}

	defer stmt.Close()

	rows, err := stmt.Query(mac)
	if err != nil {
		return nil, err
	}

	devices, err := devicesFromRows(rows)
	if err != nil {
		return nil, err
	}

	if len(devices) < 1 {
		return nil, errors.New("device not found")
	}

	return &devices[0], nil
}

func AddDevice(d *models.Device) (bool, error) {
	device := *d

	query := "INSERT INTO device (mac, name, groupname) VALUES (?, ?, ?)"

	tx, err := db.Get().Begin()
	if err != nil {
		return false, err
	}

	stmt, err := tx.Prepare(query)

	if err != nil {
		return false, err
	}

	defer stmt.Close()

	_, err = stmt.Exec(device.Mac, device.Name, device.GroupName)

	if err != nil {
		return false, err
	}

	tx.Commit()
	return true, nil
}

func UpdateDevice(d *models.Device, id int) (bool, error) {
	device := *d

	query := "UPDATE device SET mac = ?, name = ?, groupname = ?, script = ? WHERE id = ?"

	tx, err := db.Get().Begin()
	if err != nil {
		return false, err
	}

	stmt, err := tx.Prepare(query)

	if err != nil {
		return false, err
	}

	defer stmt.Close()

	_, err = stmt.Exec(device.Mac, device.Name, device.GroupName, device.Script.Id, device.Id)

	if err != nil {
		return false, err
	}

	tx.Commit()

	return true, nil
}
