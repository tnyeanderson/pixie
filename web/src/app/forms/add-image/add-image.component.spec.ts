import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { MockApiService } from 'src/app/services/api.service.mock';
import { MatDialogRefStub, MAT_DIALOG_DATA_STUB } from 'src/testing/stubs';
import { AddImageComponent } from './add-image.component';


describe('AddImageComponent', () => {
  let component: AddImageComponent;
  let fixture: ComponentFixture<AddImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: new MockApiService() },
        { provide: MatDialogRef, useValue: MatDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: MAT_DIALOG_DATA_STUB }
      ],
      imports: [HttpClientModule, MatDialogModule, MatSnackBarModule],
      declarations: [AddImageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImageComponent);
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
    component.model.Name = 'now i have a name'
    expect(component.validate()).toBeTrue()
  });

  it('submit() when files.length==0 should only call apiService.addImage()', () => {
    component.model.ID = 3
    component.model.Name = 'name 1'
    spyOn(component['apiService'], 'addImage').and.callThrough()
    spyOn(component['apiService'], 'uploadImage').and.callThrough()
    spyOn(component.dialogRef, 'close')
    component.submit()
    expect(component['apiService'].addImage).toHaveBeenCalledWith(component.model)
    expect(component['apiService'].uploadImage).not.toHaveBeenCalled()
    expect(component.dialogRef.close).toHaveBeenCalled()
  });

  it('submit() when files.length>0 should call apiService.addImage() and apiService.uploadImage()', () => {
    component.files[0] = {fileName: 'toupload'} as unknown as File
    component.model.ID = 3
    component.model.Name = 'name 1'
    component.model.Path = 'path1'
    spyOn(component['apiService'], 'addImage').and.callThrough()
    spyOn(component['apiService'], 'uploadImage').and.callThrough()
    spyOn(component.dialogRef, 'close')
    component.submit()
    expect(component['apiService'].addImage).toHaveBeenCalledWith(component.model)
    expect(component['apiService'].uploadImage).toHaveBeenCalledWith(component.model.Path, component.files[0])
    expect(component.dialogRef.close).toHaveBeenCalled()
  });
});
