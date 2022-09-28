import { ApiService } from 'src/app/services/api.service';
import { MockApiService, MOCK_FILES } from 'src/app/services/api.service.mock';
import { FilesTableDataSource } from './files-table-datasource';


describe('FilesTableDataSource', () => {
  let obj: FilesTableDataSource;
  let apiService: ApiService

  beforeEach(() => {
    obj = new FilesTableDataSource()
    apiService = new MockApiService() as any
  });

  it('should compile', () => {
    expect(obj).toBeTruthy();
  });

  it('load() should call apiService.getFiles() and updateData()', () => {
    spyOn(apiService, 'getFiles').and.callThrough()
    spyOn(obj, 'updateData')
    obj.load(apiService)
    expect(apiService.getFiles).toHaveBeenCalled()
    expect(obj.updateData).toHaveBeenCalledWith(MOCK_FILES)
  });
})