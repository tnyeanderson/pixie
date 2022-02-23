export interface ScriptItem {
  ID: number,
  CreatedAt: string,
  UpdatedAt: string,
  DeletedAt: string,
  Name: string,
  Path: string
}

export interface DeviceItem {
  ID: number,
  CreatedAt: string,
  UpdatedAt: string,
  DeletedAt: string,
  Name: string,
  Mac: string,
  GroupName: string,
  ScriptID: string
  Script: ScriptItem
}
