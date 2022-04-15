import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { MockApiService, MOCK_BLOB, MOCK_BLOB_CONTENT } from 'src/app/services/api.service.mock';
import { MatDialogRefStub, MAT_DIALOG_DATA_STUB } from 'src/testing/stubs';
import { FormifyModule } from '../formify/formify.module';
import { EditScriptComponent } from './edit-script.component';


describe('EditScriptComponent', () => {
  let component: EditScriptComponent;
  let fixture: ComponentFixture<EditScriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: new MockApiService() },
        { provide: MatDialogRef, useValue: MatDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: MAT_DIALOG_DATA_STUB },
      ],
      imports: [
        HttpClientModule,
        MatDialogModule,
        MatSnackBarModule,
        FormifyModule,
        NoopAnimationsModule,
      ],
      declarations: [EditScriptComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate() should return true if this.model.Name is set', () => {
    expect(component.validate()).toBeFalse()
    component.model.Name = 'has a name now'
    expect(component.validate()).toBeTrue()
  });

  it('submit() without a model.ID should do nothing', () => {
    spyOn(component['apiService'], 'editScript')
    component.submit()
    expect(component['apiService'].editScript).not.toHaveBeenCalled()
  });

  it('submit() with a model.ID should call apiService.editScript() and close the dialog', () => {
    component.model.ID = 5
    component.model.Name = 'testname'
    spyOn(component['apiService'], 'editScript').and.callThrough()
    spyOn(component, 'uploadFileOrText').and.callFake(() => of({}))
    spyOn(component.dialogRef, 'close')
    component.submit()
    expect(component['apiService'].editScript).toHaveBeenCalledWith(5, component.model)
    expect(component.uploadFileOrText).toHaveBeenCalled()
    expect(component.dialogRef.close).toHaveBeenCalled()
  });

  it('delete() without a model.ID should do nothing', () => {
    spyOn(component['apiService'], 'deleteScript').and.callThrough()
    component.delete()
    expect(component['apiService'].deleteScript).not.toHaveBeenCalled()
  });

  it('delete() with a model.ID should call apiService.deleteDevice()', () => {
    component.model.ID = 3
    spyOn(component['apiService'], 'deleteScript').and.callThrough()
    component.delete()
    expect(component['apiService'].deleteScript).toHaveBeenCalledWith(3)
  });

  it('ngOnInit() should set the format to inline and get the script content', () => {
    const fullpath = `scripts/${component.model.Path}`
    spyOn(component['apiService'], 'getFileContent').and.callThrough()
    spyOn(component.scriptFile, 'setInlineContent')
    component.ngOnInit()
    expect(component.scriptFile.format).toEqual(component.scriptFile.formats.inline)
    expect(component['apiService'].getFileContent).toHaveBeenCalledWith(fullpath)
    // TODO: Find out what is happening here
    // expect(component.scriptFile.setInlineContent).toHaveBeenCalledWith(MOCK_BLOB_CONTENT)
  })
});
