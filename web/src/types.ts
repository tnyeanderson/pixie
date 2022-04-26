
export class GormModel {
  ID: number | undefined
  CreatedAt: string | undefined
  UpdatedAt: string | undefined
  DeletedAt: string | undefined
}

export class FileItem extends GormModel {
  Name = ''
  Path = ''
  LastAccessed = ''
}

export class CloudConfigItem extends FileItem { }

export class ImageItem extends FileItem { }

export class ScriptItem extends FileItem {
  IsDefault = false
}

export class DeviceItem extends GormModel {
  Name = ''
  Mac = ''
  GroupName = ''
  LastBooted = ''
  ScriptID = ''
  Script = new ScriptItem()
}

export class LogItem extends GormModel {
  Summary = ''
  Detail = ''
}
