import { ScriptItem } from '../../../types';
import { ApiService } from '../../services/api.service';
import { TableDataSource } from '../tablify/table/table-datasource';


/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ScriptsTableDataSource extends TableDataSource {

  constructor(private apiService: ApiService) {
    super();
    this.load()
  }

  load() {
    this.apiService.getScripts().subscribe(data => {
      this.data = data as ScriptItem[]
      this.updated.next(true)
    })
  }
}
