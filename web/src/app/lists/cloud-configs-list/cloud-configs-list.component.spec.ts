import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddCloudConfigComponent } from 'src/app/forms/add-cloud-config/add-cloud-config.component';
import { EditCloudConfigComponent } from 'src/app/forms/edit-cloud-config/edit-cloud-config.component';
import { ApiService } from 'src/app/services/api.service';
import { MockApiService, MOCK_CLOUD_CONFIGS } from 'src/app/services/api.service.mock';
import { TablifyModule } from 'src/app/tablify/tablify.module';
import { CloudConfigsListComponent } from './cloud-configs-list.component';


describe('CloudConfigsListComponent', () => {
  let component: CloudConfigsListComponent;
  let fixture: ComponentFixture<CloudConfigsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: new MockApiService() },
      ],
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        MatDialogModule,
        TablifyModule,
        NoopAnimationsModule,
      ],
      declarations: [ CloudConfigsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudConfigsListComponent);
    component = fixture.componentInstance;
    // Don't call this yet, calls ngOnInit()
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
    it('editCloudConfig() should call openEditCloudConfigDialog()', () => {
    const i1 = MOCK_CLOUD_CONFIGS[0]
    spyOn(component, 'openEditCloudConfigDialog')
    component.editCloudConfig(i1)
    expect(component.openEditCloudConfigDialog).toHaveBeenCalledWith(i1)
  });

  it('addCloudConfig() should call openAddCloudConfigDialog()', () => {
    spyOn(component, 'openAddCloudConfigDialog')
    component.addCloudConfig()
    expect(component.openAddCloudConfigDialog).toHaveBeenCalled()
  });

  it('openEditCloudConfigDialog() should open the dialog and load the datasource on close', () => {
    // TODO: test that dialog.afterAllClosed is set up
    const data = MOCK_CLOUD_CONFIGS[0]
    spyOn(component.dialog, 'open')
    spyOn(component, 'loadData')
    component.openEditCloudConfigDialog(data)
    expect(component.dialog.open).toHaveBeenCalledWith(EditCloudConfigComponent, { width: '80%', data })
    expect(component.loadData).toHaveBeenCalled()
  })

  it('openAddCloudConfigDialog() should open the dialog and load the datasource on close', () => {
    // TODO: test that dialog.afterAllClosed is set up
    spyOn(component.dialog, 'open')
    spyOn(component, 'loadData')
    component.openAddCloudConfigDialog()
    expect(component.dialog.open).toHaveBeenCalledWith(AddCloudConfigComponent, { width: '80%' })
    expect(component.loadData).toHaveBeenCalled()
  })

  it('syncWithFilesystem() should call apiService.syncCloudConfigs and datasource.load', () => {
    spyOn(component['apiService'], 'syncCloudConfigs').and.callThrough()
    spyOn(component, 'loadData')
    component.syncWithFilesystem()
    expect(component['apiService'].syncCloudConfigs).toHaveBeenCalled()
    expect(component.loadData).toHaveBeenCalled()
  })
  
  it('loadData() should call dataSource.load()', () => {
    spyOn(component.dataSource, 'load')
    component.loadData()
    expect(component.dataSource.load).toHaveBeenCalledWith(component['apiService'])
  })

  it('ngOnInit() should call loadData()', () => {
    spyOn(component, 'loadData')
    component.ngOnInit()
    expect(component.loadData).toHaveBeenCalled()
  })
});
