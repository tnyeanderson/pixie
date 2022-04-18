import { ApiService } from 'src/app/services/api.service';
import { MockApiService, MOCK_DEVICES } from 'src/app/services/api.service.mock';
import { DevicesTableDataSource } from './devices-table-datasource';


describe('DevicesTableDataSource', () => {
  let obj: DevicesTableDataSource;
  let apiService: ApiService

  beforeEach(() => {
    obj = new DevicesTableDataSource()
    apiService = new MockApiService() as any
  });

  it('should compile', () => {
    expect(obj).toBeTruthy();
  });

  it('load() should call apiService.getDevices() and updateData()', () => {
    spyOn(apiService, 'getDevices').and.callThrough()
    spyOn(obj, 'updateData')
    obj.load(apiService)
    expect(apiService.getDevices).toHaveBeenCalled()
    expect(obj.updateData).toHaveBeenCalledWith(MOCK_DEVICES)
  });
})