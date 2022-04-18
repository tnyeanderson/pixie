import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Column } from '../columns';
import { TableDataSource, TableItem } from './table-datasource';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableItem>;
  @Input() dataSource: TableDataSource = new TableDataSource();
  @Input() editable: boolean = false
  @Input() addable: boolean = false

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  @Input() add: Function = () => { }
  @Input() edit: Function = () => { }
  @Input() columns: Column[] = []
  displayedColumns: string[] = []

  getDisplayedColumns() {
    const columns = this.getColumnNames()
    return this.addExtraColumns(columns)
  }

  getColumnNames() {
    return this.columns.map(column => column.name)
  }

  addExtraColumns(columns: string[]) {
    const out = [...columns]
    if (this.editable) {
      out.push('edit')
    }
    return out
  }

  editItem(row: any) {
    this.edit(row)
  }

  updateDisplayedColumns() {
    this.displayedColumns = this.getDisplayedColumns()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.updateDisplayedColumns()
  }
}
