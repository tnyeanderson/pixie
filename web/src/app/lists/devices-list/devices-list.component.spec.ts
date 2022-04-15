import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddDeviceComponent } from 'src/app/forms/add-device/add-device.component';
import { EditDeviceComponent } from 'src/app/forms/edit-device/edit-device.component';
import { ApiService } from 'src/app/services/api.service';
import { MockApiService, MOCK_DEVICES } from 'src/app/services/api.service.mock';
import { TablifyModule } from '../tablify/tablify.module';
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
    fixture.detectChanges();
  });

  it('should create', () => {
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
    component.openEditDeviceDialog(d1)
    expect(component.dialog.open).toHaveBeenCalledWith(EditDeviceComponent, {width: '80%', data: d1})
  });
  
  it('openAddDeviceDialog() should create a dialog', () => {
    // TODO: test that dialog.afterAllClosed is set up
    const d1 = MOCK_DEVICES[0]
    spyOn(component.dialog, 'open')
    component.openAddDeviceDialog()
    expect(component.dialog.open).toHaveBeenCalledWith(AddDeviceComponent, {width: '80%'}) 
  });
});
