import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Column } from '../columns';
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
  @Input() editable: boolean = false
  @Input() addable: boolean = false

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  @Input() add: Function = () => { }
  @Input() edit: Function = () => { }
  @Input() columns: Column[] = []
  displayedColumns: string[] = []

  getDisplayedColumns() {
    const out = this.columns.map(column => column.name)
    if (this.editable) {
      out.push('edit')
    }
    return out
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
