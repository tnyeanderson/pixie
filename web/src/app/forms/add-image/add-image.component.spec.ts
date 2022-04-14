import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiServiceStub } from 'src/testing/stubs';
import { AddImageComponent } from './add-image.component';


describe('AddImageComponent', () => {
  let component: AddImageComponent;
  let fixture: ComponentFixture<AddImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }],
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
    spyOn(component['apiService'], 'addImage').and.callFake(ApiServiceStub.addImage)
    spyOn(component['apiService'], 'uploadImage').and.callFake(ApiServiceStub.uploadImage)
    component.submit()
    expect(component['apiService'].addImage).toHaveBeenCalledWith(component.model)
    expect(component['apiService'].uploadImage).not.toHaveBeenCalled()
  });

  it('submit() when files.length>0 should call apiService.addImage() and apiService.uploadImage()', () => {
    component.files[0] = {fileName: 'toupload'} as unknown as File
    component.model.ID = 3
    component.model.Name = 'name 1'
    component.model.Path = 'path1'
    spyOn(component['apiService'], 'addImage').and.callFake(ApiServiceStub.addImage)
    spyOn(component['apiService'], 'uploadImage').and.callFake(ApiServiceStub.uploadImage)
    component.submit()
    expect(component['apiService'].addImage).toHaveBeenCalledWith(component.model)
    expect(component['apiService'].uploadImage).toHaveBeenCalledWith(component.model.Path, component.files[0])
  });
});
