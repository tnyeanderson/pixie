import { LogItem } from 'src/types';
import { ApiService } from '../../services/api.service';
import { TableDataSource } from '../table/table-datasource';


/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class LogsTableDataSource extends TableDataSource {

  constructor(private apiService: ApiService) {
    super();
    this.load()
  }

  load() {
    this.apiService.getLogs().subscribe(data => {
      this.data = data as LogItem[]
      this.updated.next(true)
    })
  }
}
