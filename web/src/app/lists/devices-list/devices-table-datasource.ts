import { DeviceItem } from 'src/types';
import { ApiService } from '../../services/api.service';
import { TableDataSource } from '../../tablify/table/table-datasource';


/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DevicesTableDataSource extends TableDataSource {

  constructor() {
    super();
  }

  load(apiService: ApiService) {
    apiService.getDevices().subscribe(data => {
      this.data = data as DeviceItem[]
      this.updated.next(true)
    })
  }
}
