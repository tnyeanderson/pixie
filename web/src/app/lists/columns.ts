import { Field } from "../forms/fields";

export class Column extends Field { }

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
}
