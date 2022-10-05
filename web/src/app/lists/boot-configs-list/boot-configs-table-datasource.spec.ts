import { ApiService } from 'src/app/services/api.service';
import { MockApiService, MOCK_BOOT_CONFIGS } from 'src/app/services/api.service.mock';
import { BootConfigsTableDataSource } from './boot-configs-table-datasource';


describe('BootConfigsTableDataSource', () => {
  let obj: BootConfigsTableDataSource;
  let apiService: ApiService

  beforeEach(() => {
    obj = new BootConfigsTableDataSource()
    apiService = new MockApiService() as any
  });

  it('should compile', () => {
    expect(obj).toBeTruthy();
  });

  it('load() should call apiService.getFiles() and updateData()', () => {
    spyOn(apiService, 'getBootConfigs').and.callThrough()
    spyOn(obj, 'updateData')
    obj.load(apiService)
    expect(apiService.getBootConfigs).toHaveBeenCalled()
    expect(obj.updateData).toHaveBeenCalledWith(MOCK_BOOT_CONFIGS)
  });
})