export class Field {
    name: string
    type: string
    displayName?: string

    constructor(name: string, type: string, displayName?: string) {
        this.name = name
        this.type = type
        this.displayName = displayName
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

  static gormModelFields: Field[] = [
    new Field('ID', 'number'),
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