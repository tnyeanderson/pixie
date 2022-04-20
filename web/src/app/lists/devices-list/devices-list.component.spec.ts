import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddDeviceComponent } from 'src/app/forms/add-device/add-device.component';
import { EditDeviceComponent } from 'src/app/forms/edit-device/edit-device.component';
import { ReloadButtonModule } from 'src/app/fragments/reload-button/reload-button.module';
import { ApiService } from 'src/app/services/api.service';
import { MockApiService, MOCK_DEVICES } from 'src/app/services/api.service.mock';
import { TablifyModule } from '../../tablify/tablify.module';
import { DevicesListComponent } from './devices-list.component';


describe('DevicesListComponent', () => {
  let component: DevicesListComponent;
  let fixture: ComponentFixture<DevicesListComponent>;

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
        ReloadButtonModule,
        NoopAnimationsModule,
      ],
      declarations: [
        DevicesListComponent,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesListComponent);
    component = fixture.componentInstance;
    // Don't call this yet, calls ngOnInit()
    // fixture.detectChanges();
  });

  it('should create', () => {
    // TODO: Test that ngOnInit effects are handled?
    // fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('editDevice() should open the edit dialog', () => {
    const d1 = MOCK_DEVICES[0]
    spyOn(component, 'openEditDeviceDialog')
    component.editDevice(d1)
    expect(component.openEditDeviceDialog).toHaveBeenCalledWith(d1)
  });

  it('addDevice() should open the add dialog', () => {
    spyOn(component, 'openAddDeviceDialog')
    component.addDevice()
    expect(component.openAddDeviceDialog).toHaveBeenCalled()
  });

  it('openEditDeviceDialog() should create a dialog', () => {
    // TODO: test that dialog.afterAllClosed is set up
    const d1 = MOCK_DEVICES[0]
    spyOn(component.dialog, 'open')
    spyOn(component, 'loadData')
    component.openEditDeviceDialog(d1)
    expect(component.dialog.open).toHaveBeenCalledWith(EditDeviceComponent, {width: '80%', data: d1})
    expect(component.loadData).toHaveBeenCalled()
  });
  
  it('openAddDeviceDialog() should create a dialog', () => {
    // TODO: test that dialog.afterAllClosed is set up
    spyOn(component.dialog, 'open')
    spyOn(component, 'loadData')
    component.openAddDeviceDialog()
    expect(component.dialog.open).toHaveBeenCalledWith(AddDeviceComponent, {width: '80%'}) 
    expect(component.loadData).toHaveBeenCalled()
  });

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
