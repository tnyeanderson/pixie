import { Field } from "../forms/fields";

export class Column extends Field {
    override getValue(obj: any) {
        const val: string = super.getValue(obj)
        if (this.isTimestamp()) {
            return new Date(val).toLocaleString()
        }
        return val
    }

    isTimestamp() {
        return this.type === 'timestamp'
    }

    isLongText() {
        return this.type === 'longtext'
    }
}

export class ListColumns {
    static idColumn = new Column('ID', 'number')

    static imagesColumns: Column[] = [
        this.idColumn,
        new Column('Name', 'string'),
        new Column('Path', 'string'),
    ]

    static scriptsColumns: Column[] = [
        this.idColumn,
        new Column('Name', 'string'),
        new Column('Path', 'string'),
    ]

    static devicesColumns: Column[] = [
        this.idColumn,
        new Column('Name', 'string'),
        new Column('Mac', 'string'),
        new Column('GroupName', 'string', 'Group'),
        new Column('ScriptID', 'string', 'Script', ['Script', 'Name'], 'Default')
    ]

    static logsColumns: Column[] = [
        this.idColumn,
        new Column('CreatedAt', 'timestamp', 'Timestamp'),
        new Column('Summary', 'string'),
        new Column('Detail', 'longtext'),
    ]
}
