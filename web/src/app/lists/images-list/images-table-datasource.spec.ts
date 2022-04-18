import { ApiService } from 'src/app/services/api.service';
import { MockApiService, MOCK_IMAGES } from 'src/app/services/api.service.mock';
import { ImagesTableDataSource } from './images-table-datasource';


describe('ImagesTableDataSource', () => {
  let obj: ImagesTableDataSource;
  let apiService: ApiService

  beforeEach(() => {
    obj = new ImagesTableDataSource()
    apiService = new MockApiService() as any
  });

  it('should compile', () => {
    expect(obj).toBeTruthy();
  });

  it('load() should call apiService.getImages() and updateData()', () => {
    spyOn(apiService, 'getImages').and.callThrough()
    spyOn(obj, 'updateData')
    obj.load(apiService)
    expect(apiService.getImages).toHaveBeenCalled()
    expect(obj.updateData).toHaveBeenCalledWith(MOCK_IMAGES)
  });
})