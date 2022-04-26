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
    static idColumn = new Column('ID', 'number')
    static lastAccessedColumn = new Column('LastAccessed', 'timestamp', 'Last Accessed')

    static cloudConfigsColumns: Column[] = [
        this.idColumn,
        new Column('Name', 'string'),
        new Column('Path', 'string'),
        this.lastAccessedColumn,
    ]

    static imagesColumns: Column[] = [
        this.idColumn,
        new Column('Name', 'string'),
        new Column('Path', 'string'),
        this.lastAccessedColumn,
    ]

    static scriptsColumns: Column[] = [
        this.idColumn,
        new Column('Name', 'string'),
        new Column('Path', 'string'),
        this.lastAccessedColumn,
    ]

    static devicesColumns: Column[] = [
        this.idColumn,
        new Column('Name', 'string'),
        new Column('Mac', 'string'),
        new Column('GroupName', 'string', 'Group'),
        new Column('ScriptID', 'string', 'Script', ['Script', 'Name'], 'Default'),
        new Column('LastBooted', 'timestamp', 'Latest boot')
    ]

    static logsColumns: Column[] = [
        new Column('CreatedAt', 'timestamp', 'Timestamp'),
        new Column('Type', 'string'),
        new Column('Summary', 'string'),
        new Column('Detail', 'longtext'),
    ]
}
