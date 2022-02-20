package models

import "github.com/tnyeanderson/ipxe-hub/types"

type Device struct {
	Id        types.NullInt64  `json:"id"`
	Mac       types.NullString `json:"mac"`
	Name      types.NullString `json:"name"`
	GroupName types.NullString `json:"groupname"`
	Script    Script           `json:"script"`
}
