import { ImageItem } from '../../../types';
import { ApiService } from '../../services/api.service';
import { TableDataSource } from '../../tablify/table/table-datasource';


/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ImagesTableDataSource extends TableDataSource {

  load(apiService: ApiService) {
    apiService.getImages().subscribe(data => {
      this.updateData(data as ImageItem[])
    })
  }

}
