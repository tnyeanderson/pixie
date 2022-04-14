import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiServiceResponsesStub, ApiServiceStub, MatDialogRefStub, MAT_DIALOG_DATA_STUB } from 'src/testing/stubs';
import { DeviceItem } from 'src/types';
import { EditDeviceComponent } from './edit-device.component';


describe('EditDeviceComponent', () => {
  let component: EditDeviceComponent;
  let fixture: ComponentFixture<EditDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: MatDialogRef, useValue: MatDialogRefStub }, { provide: MAT_DIALOG_DATA, useValue: MAT_DIALOG_DATA_STUB }],
      imports: [HttpClientModule, MatDialogModule, MatSnackBarModule],
      declarations: [EditDeviceComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.model = new DeviceItem()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate() should return true if this.model.Mac is set', () => {
    expect(component.validate()).toBeFalse()
    component.model.Mac = 'has a mac now'
    expect(component.validate()).toBeTrue()
  });

  it('submit() without a model.ID should do nothing', () => {
    spyOn(component['apiService'], 'editDevice')
    component.submit()
    expect(component['apiService'].editDevice).not.toHaveBeenCalled()
  });
  
  it('submit() with a model.ID should call apiService.editDevice() and close the dialog', () => {
    component.model.ID = 5
    component.model.Mac = 'testmac'
    spyOn(component['apiService'], 'editDevice').and.callFake(ApiServiceStub.editDevice)
    spyOn(component.dialogRef, 'close')
    component.submit()
    expect(component['apiService'].editDevice).toHaveBeenCalledWith(5, component.model)
    expect(component.dialogRef.close).toHaveBeenCalled()
  });

  it('delete() without a model.ID should do nothing', () => {
    spyOn(component['apiService'], 'deleteDevice').and.callFake(ApiServiceStub.deleteDevice)
    component.delete()
    expect(component['apiService'].deleteDevice).not.toHaveBeenCalled()
  });

  it('delete() with a model.ID should call apiService.deleteDevice()', () => {
    component.model.ID = 3
    spyOn(component['apiService'], 'deleteDevice').and.callFake(ApiServiceStub.deleteDevice)
    component.delete()
    expect(component['apiService'].deleteDevice).toHaveBeenCalledWith(3)
  });

  it('ngOnInit() should call apiService.getScripts() and set this.scripts', () => {
    spyOn(component['apiService'], 'getScripts').and.callFake(ApiServiceStub.getScripts)
    component.ngOnInit()
    expect(component['apiService'].getScripts).toHaveBeenCalled()
    expect(component.scripts).toEqual(ApiServiceResponsesStub.getScriptsResponse())
  })

});
