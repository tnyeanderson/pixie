import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MOCK_INLINE_CONTENT } from 'src/app/formify/formify-components/form-input-upload-inline/upload-inline.mock';
import { UploadInlineService } from 'src/app/formify/formify-services/upload-inline.service';
import { MockUploadInlineService } from 'src/app/formify/formify-services/upload-inline.service.mock';
import { ApiService } from 'src/app/services/api.service';
import { MockApiService, MOCK_BLOB, MOCK_BLOB_CONTENT, MOCK_FILE } from 'src/app/services/api.service.mock';
import { MatDialogRefStub, MAT_DIALOG_DATA_SCRIPT_STUB } from 'src/testing/stubs';
import { FormifyModule } from '../../formify/formify.module';
import { EditScriptComponent } from './edit-script.component';


describe('EditScriptComponent', () => {
  let component: EditScriptComponent;
  let fixture: ComponentFixture<EditScriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: UploadInlineService, useValue: new MockUploadInlineService() },
        { provide: ApiService, useValue: new MockApiService() },
        { provide: MatDialogRef, useValue: MatDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: MAT_DIALOG_DATA_SCRIPT_STUB },
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
    // Don't call this yet, calls ngOnInit()
    // fixture.detectChanges();
  });

  it('should create', () => {
    // TODO: Test that ngOnInit effects are handled?
    // fixture.detectChanges()
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

  it('uploadFileOrText() should call scriptFile.do() with the proper callbacks', () => {
    spyOn(component.scriptFile, 'do')
    component.uploadFileOrText()
    expect(component.scriptFile.do).toHaveBeenCalledWith(
      component.uploaders.ifUpload,
      component.uploaders.ifInline,
      component.uploaders.otherwise,
    )
  })

  it('uploaders.ifUpload() should call apiService.uploadScript()', () => {
    const path = 'testpath'
    const file = MOCK_FILE
    component.scriptFile.files[0] = file
    component.model.Path = path
    spyOn(component.scriptFile, 'getFile').and.callThrough()
    spyOn(component['apiService'], 'uploadScript').and.callThrough()
    component.uploaders.ifUpload()
    expect(component['apiService'].uploadScript).toHaveBeenCalledWith(path, file)
  })

  it('uploaders.ifInline() should call apiService.uploadScriptText()', () => {
    const path = 'testpath'
    const content = MOCK_INLINE_CONTENT
    component.scriptFile.scriptContent.Content = content
    component.model.Path = path
    spyOn(component.scriptFile, 'getInline').and.callThrough()
    spyOn(component['apiService'], 'uploadScriptText').and.callThrough()
    component.uploaders.ifInline()
    expect(component['apiService'].uploadScriptText).toHaveBeenCalledWith(path, content)
  })

  it('uploaders.otherwise() should return a skipped status', (done) => {
    const status = { status: 'skipped file contents update' }
    component.uploaders.otherwise().subscribe(r => {
      expect(r).toEqual(status)
      done()
    })
  })

  it('ngOnInit() should call setModeInline() and initializeContent()', () => {
    spyOn(component.scriptFile, 'setModeInline')
    spyOn(component, 'initializeContent')
    component.ngOnInit()
    expect(component.scriptFile.setModeInline).toHaveBeenCalled()
    expect(component.initializeContent).toHaveBeenCalled()
  })

  it('initializeContent() should get the script content', () => {
    const fullpath = `scripts/${component.initialData.Path}`
    spyOn(component['apiService'], 'getFileContent').and.callThrough()
    spyOn(component, 'initializeContentFromBlob')
    component.initializeContent()
    expect(component['apiService'].getFileContent).toHaveBeenCalledWith(fullpath)
    expect(component.initializeContentFromBlob).toHaveBeenCalledWith(MOCK_BLOB)
  })

  it('initializeContentFromBlob() should set the script content to the blob content', (done) => {
    spyOn(component.scriptFile, 'setInlineContent').and.callThrough()
    component.initializeContentFromBlob(MOCK_BLOB).then(() => {
      expect(component.scriptFile.setInlineContent).toHaveBeenCalledWith(MOCK_BLOB_CONTENT)
      done()
    })
  })
});
