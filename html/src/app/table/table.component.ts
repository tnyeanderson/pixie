import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DeviceItem, ScriptItem } from 'src/types';
import { TableDataSource, TableScriptItem } from './table-datasource';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableScriptItem>;
  @Input() dataSource: TableDataSource = new TableDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  @Input() edit: Function = () => { }
  @Input() sourceColumns: string[] = []
  displayedColumns: string[] = []

  getDisplayedColumns() {
    return [...this.sourceColumns, 'edit']
  }

  editItem(row: any) {
    this.edit(row)
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    setTimeout(() => {
      this.displayedColumns = this.getDisplayedColumns()
    }, 0)
}
}
