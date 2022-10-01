import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddFileComponent } from 'src/app/forms/add-file/add-file.component';
import { EditFileComponent } from 'src/app/forms/edit-file/edit-file.component';
import { ApiService } from 'src/app/services/api.service';
import { MockApiService, MOCK_FILES } from 'src/app/services/api.service.mock';
import { FileItem } from 'src/types';
import { TablifyModule } from '../../tablify/tablify.module';
import { FilesListComponent } from './files-list.component';


describe('FilesListComponent', () => {
  let component: FilesListComponent;
  let fixture: ComponentFixture<FilesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: new MockApiService() },
      ],
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        MatDialogModule,
        TablifyModule,
        NoopAnimationsModule,
      ],
      declarations: [
        FilesListComponent,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesListComponent);
    component = fixture.componentInstance;
    // Don't call this yet, calls ngOnInit()
    // fixture.detectChanges();
  });

  it('should create', () => {
    // TODO: Test that ngOnInit effects are handled?
    // fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('editFile() should call openEditFileDialog()', () => {
    const i1 = MOCK_FILES[0]
    spyOn(component, 'openEditFileDialog')
    component.editFile(i1)
    expect(component.openEditFileDialog).toHaveBeenCalledWith(i1)
  });

  it('addFile() should call openAddFileDialog()', () => {
    spyOn(component, 'openAddFileDialog')
    component.addFile()
    expect(component.openAddFileDialog).toHaveBeenCalled()
  });

  it('deleteFile() should call apiService.deleteFile() and loadData()', () => {
    const id = 55
    const file = new FileItem()
    file.id = id
    spyOn(component['apiService'], 'deleteFile').and.callThrough()
    spyOn(component, 'loadData')
    component.deleteFile(file)
    expect(component['apiService'].deleteFile).toHaveBeenCalledWith(id)
    expect(component.loadData).toHaveBeenCalled()
  });

  it('openEditFileDialog() should open the dialog and load the datasource on close', () => {
    // TODO: test that dialog.afterAllClosed is set up
    const data = MOCK_FILES[0]
    spyOn(component.dialog, 'open')
    spyOn(component, 'loadData')
    component.openEditFileDialog(data)
    expect(component.dialog.open).toHaveBeenCalledWith(EditFileComponent, {width: '80%', data})
    expect(component.loadData).toHaveBeenCalled()
  })

  it('openAddFileDialog() should open the dialog and load the datasource on close', () => {
    // TODO: test that dialog.afterAllClosed is set up
    spyOn(component.dialog, 'open')
    spyOn(component, 'loadData')
    component.openAddFileDialog()
    expect(component.dialog.open).toHaveBeenCalledWith(AddFileComponent, {width: '80%'})
    expect(component.loadData).toHaveBeenCalled()
  })

  it('syncWithFilesystem() should call apiService.syncFiles and loadData', () => {
    spyOn(component['apiService'], 'syncFiles').and.callThrough()
    spyOn(component, 'loadData')
    component.syncWithFilesystem()
    expect(component['apiService'].syncFiles).toHaveBeenCalled()
    expect(component.loadData).toHaveBeenCalled()
  })

  it('loadData() should call dataSource.load()', () => {
    spyOn(component.dataSource, 'load')
    component.loadData()
    expect(component.dataSource.load).toHaveBeenCalledWith(component['apiService'])
  })

  it('ngOnInit() should call loadData()', () => {
    spyOn(component, 'loadData')
    component.ngOnInit()
    expect(component.loadData).toHaveBeenCalled()
  })
  
});
