export class Column {
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

    getDisplayName() {
        return this.displayName || this.name
    }

    getValue(obj: any) {
        const val: string = this.getRawValue(obj)
        if (val && this.isTimestamp()) {
            return new Date(val).toLocaleString()
        }
        return val
    }

    getRawValue(obj: any) {
        let keys = this.getResolverKeys()
        let out = this.resolve(obj, keys)
        return out || this.defaultValue
    }

    resolve(obj: any, keys: string[]) {
        let out = Object.assign(obj)
        try {
            keys.forEach(key => out = out[key])
            return out
        } catch (e) {
            return undefined
        }
    }

    getResolverKeys() {
        return (this.resolver.length > 0) ? this.resolver : [this.name]
    }

    isTimestamp() {
        return this.type === 'timestamp'
    }

    isLongText() {
        return this.type === 'longtext'
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

export class ListColumns {
    static idColumn = new Column('id', 'number', 'ID')
    static lastAccessedColumn = new Column('lastAccessedAt', 'timestamp', 'Last Accessed')

    static filesColumns: Column[] = [
        this.idColumn,
        new Column('name', 'string', 'Name'),
        new Column('path', 'string', 'Path'),
        new Column('fileType', 'string', 'File Type'),
        this.lastAccessedColumn,
    ]

    static bootConfigsColumns: Column[] = [
        this.idColumn,
        new Column('name', 'string', 'Name'),
        new Column('config', 'string', 'Config (JSON)'),
    ]

    static devicesColumns: Column[] = [
        this.idColumn,
        new Column('name', 'string', 'Name'),
        new Column('mac', 'string', 'Mac'),
        new Column('groupName', 'string', 'Group'),
        new Column('scriptId', 'string', 'Script', ['script', 'name'], 'Default'),
        new Column('bootConfigId', 'string', 'Boot Config', ['bootConfig', 'name']),
        new Column('lastBootedAt', 'timestamp', 'Latest boot')
    ]

    static logsColumns: Column[] = [
        new Column('createdAt', 'timestamp', 'Timestamp'),
        new Column('type', 'string', 'Type'),
        new Column('summary', 'string', 'Summary'),
        new Column('detail', 'longtext', 'Detail'),
    ]
}
