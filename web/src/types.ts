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

export class LogItem extends GormModel {
  Summary = ''
  Detail = ''
}


export class UploadInline {
  // These values correspond to tab indexes
  formats = {
    upload: 0,
    inline: 1
  }
  scriptContent: any = { Content: '' }
  files: File[] = []
  // format: Observable<string> = of(this.formats.upload)
  format = this.formats.upload

  isInline(): boolean {
    return this.format === this.formats.inline
  }

  isUpload(): boolean {
    return this.format === this.formats.upload
  }

  setInlineContent(content: string) {
    this.scriptContent.Content = content
  }

  getInline(): string {
    return this.scriptContent.Content
  }

  getFile(): File {
    return this.files[0]
  }

  hasContent(): boolean {
    return (this.isInline() && this.scriptContent.Content) || (this.isUpload() && this.files.length > 0)
  }
}

