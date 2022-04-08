import { ImageItem } from '../../../types';
import { ApiService } from '../../services/api.service';
import { TableDataSource } from '../table/table-datasource';


/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ImagesTableDataSource extends TableDataSource {

  constructor(private apiService: ApiService) {
    super();
    this.load()
  }

  load() {
    this.apiService.getImages().subscribe(data => {
      this.data = data as ImageItem[]
      this.updated.next(true)
    })
  }
}
