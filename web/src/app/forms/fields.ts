export class Field {
  name: string
  type: string
  resolver: string[]
  displayName?: string
  defaultValue?: string | number

  constructor(name: string, type: string, displayName?: string, resolver?: string[], defaultValue?: string | number) {
    this.name = name
    this.type = type
    this.displayName = displayName
    this.resolver = resolver || []
    this.defaultValue = defaultValue || ''
  }

  getValue(obj: any) {
    let out = obj
    let keys = (this.resolver.length > 0) ? this.resolver : [this.name]
    keys.forEach(key => out = out[key])
    return out || this.defaultValue
  }

  getDisplayName() {
    return this.displayName || this.name
  }

  isBoolean() {
    return this.type === 'boolean'
  }

  isNumber() {
    return this.type === 'number'
  }

  isString() {
    return this.type === 'string'
  }
}

export class FormFields {

  static idField = new Field('ID', 'number')

  static gormModelFields: Field[] = [
    this.idField,
    new Field('CreatedAt', 'string', 'Created'),
    new Field('UpdatedAt', 'string', 'Updated'),
    new Field('DeletedAt', 'string', 'Deleted'),
  ]

  static scriptFields: Field[] = [
    new Field('Name', 'string'),
    new Field('Path', 'string'),
    new Field('IsDefault', 'boolean', 'Set as default'),
  ]

  static deviceFields: Field[] = [
    new Field('Name', 'string'),
    new Field('Mac', 'string'),
    new Field('GroupName', 'string', 'Group'),
    new Field('ScriptID', 'number'),
  ]


  static viewScriptFields: Field[] = [
    ...FormFields.gormModelFields,
    ...FormFields.scriptFields
  ]

  static viewDeviceFields: Field[] = [
    ...FormFields.gormModelFields,
    ...FormFields.deviceFields
  ]
}