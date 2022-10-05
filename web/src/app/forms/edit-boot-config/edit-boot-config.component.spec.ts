import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from 'src/app/services/api.service';
import { MockApiService } from 'src/app/services/api.service.mock';
import { MatDialogRefStub, MAT_DIALOG_DATA_STUB } from 'src/testing/stubs';
import { FormifyModule } from '../../formify/formify.module';
import { EditBootConfigComponent } from './edit-boot-config.component';


describe('EditBootConfigComponent', () => {
  let component: EditBootConfigComponent;
  let fixture: ComponentFixture<EditBootConfigComponent>;

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
      declarations: [EditBootConfigComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBootConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate() should return true if model.Name is set', () => {
    expect(component.validate()).toBeFalse()
    component.model.name = 'now i have a name'
    expect(component.validate()).toBeTrue()
  });

  it('submit() should call apiService.editBootConfig()', () => {
    component.model.id = 3
    component.model.name = 'name 1'
    component.model.config = '{"test": "value"}'
    spyOn(component['apiService'], 'editBootConfig').and.callThrough()
    spyOn(component.dialogRef, 'close')
    component.submit()
    expect(component['apiService'].editBootConfig).toHaveBeenCalledWith(3, component.model)
    expect(component.dialogRef.close).toHaveBeenCalled()
  });
});
