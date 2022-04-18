import { ApiService } from 'src/app/services/api.service';
import { MockApiService, MOCK_LOGS } from 'src/app/services/api.service.mock';
import { LogsTableDataSource } from './logs-table-datasource';


describe('LogsTableDataSource', () => {
  let obj: LogsTableDataSource;
  let apiService: ApiService

  beforeEach(() => {
    obj = new LogsTableDataSource()
    apiService = new MockApiService() as any
  });

  it('should compile', () => {
    expect(obj).toBeTruthy();
  });

  it('load() should call apiService.getLogs() and updateData()', () => {
    spyOn(apiService, 'getLogs').and.callThrough()
    spyOn(obj, 'updateData')
    obj.load(apiService)
    expect(apiService.getLogs).toHaveBeenCalled()
    expect(obj.updateData).toHaveBeenCalledWith(MOCK_LOGS)
  });
})