import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiServiceResponsesStub, ApiServiceStub, MatDialogRefStub, MAT_DIALOG_DATA_STUB } from 'src/testing/stubs';
import { AddDeviceComponent } from './add-device.component';


describe('AddDeviceComponent', () => {
  let component: AddDeviceComponent;
  let fixture: ComponentFixture<AddDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: MatDialogRef, useValue: MatDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: MAT_DIALOG_DATA_STUB }
      ],
      imports: [HttpClientModule, MatDialogModule, MatSnackBarModule],
      declarations: [AddDeviceComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate() should check that a Mac is set', () => {
    expect(component.validate()).toBeFalse()
    component.model.Mac = 'has a value'
    expect(component.validate()).toBeTrue()
  });

  it('submit() should call apiService.addDevice()', () => {
    const testModel = ApiServiceResponsesStub.getDevicesResponse()[0]
    component.model = testModel
    spyOn(component['apiService'], 'addDevice').and.callFake(ApiServiceStub.addDevice)
    spyOn(component.dialogRef, 'close')
    component.submit()
    expect(component['apiService'].addDevice).toHaveBeenCalledWith(testModel)
    expect(component.dialogRef.close).toHaveBeenCalled()
  });

  it('ngOnInit() should call apiService.getScripts() and set this.scripts', () => {
    spyOn(component['apiService'], 'getScripts').and.callFake(ApiServiceStub.getScripts)
    component.ngOnInit()
    expect(component['apiService'].getScripts).toHaveBeenCalled()
    expect(component.scripts).toEqual(ApiServiceResponsesStub.getScriptsResponse())
  })
})
