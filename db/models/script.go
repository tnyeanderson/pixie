package models

import (
	"github.com/tnyeanderson/ipxe-hub/types"
)

type Script struct {
	Id   types.NullInt64  `json:"id"`
	Name types.NullString `json:"name"`
	Slug types.NullString `json:"slug"`
}
