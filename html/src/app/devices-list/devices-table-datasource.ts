import { DeviceItem } from 'src/types';
import { ApiService } from '../services/api.service';
import { TableDataSource } from '../table/table-datasource';


/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DevicesTableDataSource extends TableDataSource {

  constructor(private apiService: ApiService) {
    super();
    this.apiService.getDevices().subscribe(data => {
      this.data = data as DeviceItem[]
      console.log('hey')
      this.updated.next(true)
    })
  }
}
