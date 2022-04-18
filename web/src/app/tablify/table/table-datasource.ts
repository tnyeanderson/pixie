import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

// TODO: Genericize this
export interface TableScriptItem {
  ID: number,
  CreatedAt: string,
  UpdatedAt: string,
  DeletedAt: string,
  Name: string,
  Path: string
}


/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<TableScriptItem> {
  data: any[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  updated = new Subject();



  constructor() {
    super();
  }

  updateData(data: any[]) {
    this.data = data
    this.updated.next(true)
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TableScriptItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange, this.updated)
        .pipe(map(() => {
          let data = this.data || []
          return this.getPagedData(this.getSortedData([...data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TableScriptItem[]): TableScriptItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: any[]): any[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      // Don't sort
      return data;
    }

    const sortKey = this.sort.active
    data.sort((a, b) => {
      return compareKeys(sortKey, a, b)
    });
    if (this.sort?.direction === 'desc') {
      data.reverse()
    }
    return data
  }
}

function compareKeys(key: string, a: any, b: any) {
  const aVal = String(a[key])
  const bVal = String(b[key])

  return aVal.localeCompare(bVal, undefined, { numeric: true })
}