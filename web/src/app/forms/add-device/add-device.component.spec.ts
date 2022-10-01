import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from 'src/app/services/api.service';
import { MockApiService, MOCK_DEVICES, MOCK_FILES } from 'src/app/services/api.service.mock';
import { MatDialogRefStub, MAT_DIALOG_DATA_STUB } from 'src/testing/stubs';
import { FormifyModule } from '../../formify/formify.module';
import { AddDeviceComponent } from './add-device.component';


describe('AddDeviceComponent', () => {
  let component: AddDeviceComponent;
  let fixture: ComponentFixture<AddDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: new MockApiService() },
        { provide: MatDialogRef, useValue: MatDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: MAT_DIALOG_DATA_STUB }
      ],
      imports: [
        HttpClientModule,
        MatDialogModule,
        MatSnackBarModule,
        FormifyModule,
        NoopAnimationsModule,
      ],
      declarations: [AddDeviceComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeviceComponent);
    component = fixture.componentInstance;
    // Don't call this yet, calls ngOnInit()
    // fixture.detectChanges();
  });

  it('should create', () => {
    // TODO: Test that ngOnInit effects are handled?
    // fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('validate() should check that a Mac is set', () => {
    expect(component.validate()).toBeFalse()
    component.model.mac = 'has a value'
    expect(component.validate()).toBeTrue()
  });

  it('submit() should call apiService.addDevice()', () => {
    const testModel = MOCK_DEVICES[0]
    component.model = testModel
    spyOn(component['apiService'], 'addDevice').and.callThrough()
    spyOn(component.dialogRef, 'close')
    component.submit()
    expect(component['apiService'].addDevice).toHaveBeenCalledWith(testModel)
    expect(component.dialogRef.close).toHaveBeenCalled()
  });

  it('initializeScripts() should set this.scripts', () => {
    component.scripts = []
    expect(component.scripts).not.toEqual(MOCK_FILES)
    component.initializeScripts(MOCK_FILES)
    expect(component.scripts).toEqual(MOCK_FILES)
  })

  it('ngOnInit() should call apiService.getFiles() and set this.scripts', () => {
    spyOn(component['apiService'], 'getFiles').and.callThrough()
    spyOn(component, 'initializeScripts')
    component.ngOnInit()
    expect(component['apiService'].getFiles).toHaveBeenCalled()
    expect(component.initializeScripts).toHaveBeenCalledWith(MOCK_FILES)
  })
})
