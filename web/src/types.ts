export class GormModel {
  ID: number | undefined
  CreatedAt: string | undefined
  UpdatedAt: string | undefined
  DeletedAt: string | undefined
}

export class FileItem extends GormModel {
  Name = ''
  Path = ''
}

export class ImageItem extends FileItem { }

export class ScriptItem extends FileItem {
  IsDefault = false
}

export class DeviceItem extends GormModel {
  Name = ''
  Mac = ''
  GroupName = ''
  ScriptID = ''
  Script = new ScriptItem()
}
