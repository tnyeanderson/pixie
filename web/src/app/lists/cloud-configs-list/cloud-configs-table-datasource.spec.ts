import { ApiService } from 'src/app/services/api.service';
import { MockApiService, MOCK_CLOUD_CONFIGS, MOCK_SCRIPTS } from 'src/app/services/api.service.mock';
import { CloudConfigsTableDataSource } from './cloud-configs-table-datasource';


describe('CloudConfigsTableDataSource', () => {
  let obj: CloudConfigsTableDataSource;
  let apiService: ApiService

  beforeEach(() => {
    obj = new CloudConfigsTableDataSource()
    apiService = new MockApiService() as any
  });

  it('should compile', () => {
    expect(obj).toBeTruthy();
  });

  it('load() should call apiService.getCloudConfigs() and updateData()', () => {
    spyOn(apiService, 'getCloudConfigs').and.callThrough()
    spyOn(obj, 'updateData')
    obj.load(apiService)
    expect(apiService.getCloudConfigs).toHaveBeenCalled()
    expect(obj.updateData).toHaveBeenCalledWith(MOCK_CLOUD_CONFIGS)
  });
})