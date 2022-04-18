import { ApiService } from 'src/app/services/api.service';
import { MockApiService, MOCK_SCRIPTS } from 'src/app/services/api.service.mock';
import { ScriptsTableDataSource } from './scripts-table-datasource';


describe('ScriptsTableDataSource', () => {
  let obj: ScriptsTableDataSource;
  let apiService: ApiService

  beforeEach(() => {
    obj = new ScriptsTableDataSource()
    apiService = new MockApiService() as any
  });

  it('should compile', () => {
    expect(obj).toBeTruthy();
  });

  it('load() should call apiService.getScripts() and updateData()', () => {
    spyOn(apiService, 'getScripts').and.callThrough()
    spyOn(obj, 'updateData')
    obj.load(apiService)
    expect(apiService.getScripts).toHaveBeenCalled()
    expect(obj.updateData).toHaveBeenCalledWith(MOCK_SCRIPTS)
  });
})