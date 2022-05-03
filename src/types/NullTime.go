package types

import (
	"database/sql"
	"encoding/json"
)

// NullTime is an alias for sql.NullTime data type
type NullTime struct {
	sql.NullTime
}

// MarshalJSON for NullBool
func (nb *NullTime) MarshalJSON() ([]byte, error) {
	if !nb.Valid {
		return []byte("null"), nil
	}
	return json.Marshal(nb.Time)
}

// UnmarshalJSON for NullBool
func (nb *NullTime) UnmarshalJSON(b []byte) error {
	// For some reason the byte array is just two double quotes
	emptyStr := "\"\""
	if string(b) == emptyStr {
		nb = nil
		return nil
	}
	err := json.Unmarshal(b, &nb.Time)
	nb.Valid = (err == nil)
	return err
}
