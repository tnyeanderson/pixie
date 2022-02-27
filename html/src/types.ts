export class GormModel {
  ID: number | undefined
  CreatedAt: string | undefined
  UpdatedAt: string | undefined
  DeletedAt: string | undefined
}

export class ScriptItem extends GormModel {
  Name = ''
  Path = ''
  IsDefault = false
}

export class DeviceItem extends GormModel {
  Name = ''
  Mac = ''
  GroupName = ''
  ScriptID = ''
  Script = new ScriptItem()
}
