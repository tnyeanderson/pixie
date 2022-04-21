import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ConfirmService } from 'src/app/services/confirm/confirm.service';
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
  @Input() deletable: boolean = false

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  @Input() add: Function = () => { }
  @Input() edit: Function = () => { }
  @Input() delete: Function = () => { }
  @Input() columns: Column[] = []
  displayedColumns: string[] = []

  constructor(private confirm: ConfirmService) { }

  getDisplayedColumns() {
    const columns = this.getColumnNames()
    return this.addExtraColumns(columns)
  }

  getColumnNames() {
    return this.columns.map(column => column.name)
  }

  addExtraColumns(columns: string[]) {
    const out = [...columns]
    out.push('extras')
    return out
  }

  editItem(row: any) {
    this.edit(row)
  }

  deleteItem(row: any) {
    this.confirm.ask(() => {
      this.delete(row)
    }, 'Delete item?')
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
