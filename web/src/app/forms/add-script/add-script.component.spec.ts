import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { MockApiService, MOCK_FILE } from 'src/app/services/api.service.mock';
import { MatDialogRefStub, MAT_DIALOG_DATA_STUB } from 'src/testing/stubs';
import { FormifyModule } from '../../formify/formify.module';
import { AddScriptComponent } from './add-script.component';


describe('AddScriptComponent', () => {
  let component: AddScriptComponent;
  let fixture: ComponentFixture<AddScriptComponent>;

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
      declarations: [AddScriptComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fileAdded() should set model.Name and model.Path if they are not already set', () => {
    const event = {
      addedFiles: [MOCK_FILE]
    }
    component.model.Name = ''
    component.model.Path = ''
    component.fileAdded(event)
    expect(component.model.Name).toEqual(MOCK_FILE.name)
    expect(component.model.Path).toEqual(MOCK_FILE.name)
  })

  it('fileAdded() should not set model.Name and model.Path if they are already set', () => {
    const event = {
      addedFiles: [MOCK_FILE]
    }
    const name = 'NAME SET'
    const path = 'PATH SET'
    component.model.Name = name
    component.model.Path = path
    component.fileAdded(event)
    expect(component.model.Name).toEqual(name)
    expect(component.model.Path).toEqual(path)
  })

  it('validate() should return true if model.Name is set', () => {
    expect(component.validate()).toBeFalse()
    component.model.Name = 'now i have a name'
    expect(component.validate()).toBeTrue()
  });

  it('submit() with a model.ID should call apiService.addScript() and close the dialog', () => {
    component.model.ID = 5
    component.model.Name = 'testname'
    spyOn(component['apiService'], 'addScript').and.callThrough()
    spyOn(component, 'uploadFileOrText').and.callFake(() => of({}))
    spyOn(component.dialogRef, 'close')
    component.submit()
    expect(component['apiService'].addScript).toHaveBeenCalledWith(component.model)
    expect(component.uploadFileOrText).toHaveBeenCalled()
    expect(component.dialogRef.close).toHaveBeenCalled()
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
    const content = 'testcontent'
    component.scriptFile.scriptContent.Content = content
    component.model.Path = path
    spyOn(component.scriptFile, 'getInline').and.callThrough()
    spyOn(component['apiService'], 'uploadScriptText').and.callThrough()
    component.uploaders.ifInline()
    expect(component['apiService'].uploadScriptText).toHaveBeenCalledWith(path, content)
  })

  it('uploaders.otherwise() should return a skipped status', () => {
    const status = { status: 'skipped file contents update' }
    component.uploaders.otherwise().subscribe(r => {
      expect(r).toEqual(status)
    })
  })
});
