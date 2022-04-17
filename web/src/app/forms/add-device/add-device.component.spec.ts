import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from 'src/app/services/api.service';
import { MockApiService, MOCK_DEVICES, MOCK_SCRIPTS } from 'src/app/services/api.service.mock';
import { MatDialogRefStub, MAT_DIALOG_DATA_STUB } from 'src/testing/stubs';
import { FormifyModule } from '../../formify/formify.module';
import { AddDeviceComponent } from './add-device.component';


describe('AddDeviceComponent', () => {
  let component: AddDeviceComponent;
  let fixture: ComponentFixture<AddDeviceComponent>;
  let ngOnInitSpy: jasmine.Spy

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
    ngOnInitSpy = spyOn(component, 'ngOnInit')
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
    const testModel = MOCK_DEVICES[0]
    component.model = testModel
    spyOn(component['apiService'], 'addDevice').and.callThrough()
    spyOn(component.dialogRef, 'close')
    component.submit()
    expect(component['apiService'].addDevice).toHaveBeenCalledWith(testModel)
    expect(component.dialogRef.close).toHaveBeenCalled()
  });

  it('ngOnInit() should call apiService.getScripts() and set this.scripts', () => {
    spyOn(component['apiService'], 'getScripts').and.callThrough()
    ngOnInitSpy.and.callThrough()
    component.ngOnInit()
    expect(component['apiService'].getScripts).toHaveBeenCalled()
    expect(component.scripts).toEqual(MOCK_SCRIPTS)
  })
})
