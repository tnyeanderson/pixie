import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddScriptComponent } from 'src/app/forms/add-script/add-script.component';
import { EditScriptComponent } from 'src/app/forms/edit-script/edit-script.component';
import { ApiService } from 'src/app/services/api.service';
import { MockApiService, MOCK_SCRIPTS } from 'src/app/services/api.service.mock';
import { TablifyModule } from '../../tablify/tablify.module';
import { ScriptsListComponent } from './scripts-list.component';


describe('ScriptsListComponent', () => {
  let component: ScriptsListComponent;
  let fixture: ComponentFixture<ScriptsListComponent>;

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
        ScriptsListComponent,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptsListComponent);
    component = fixture.componentInstance;
    // Don't call this yet, calls ngOnInit()
    // fixture.detectChanges();
  });

  it('should create', () => {
    // TODO: Test that ngOnInit effects are handled?
    // fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('editScript() should call openEditScriptDialog()', () => {
    const i1 = MOCK_SCRIPTS[0]
    spyOn(component, 'openEditScriptDialog')
    component.editScript(i1)
    expect(component.openEditScriptDialog).toHaveBeenCalledWith(i1)
  });

  it('addScript() should call openAddScriptDialog()', () => {
    spyOn(component, 'openAddScriptDialog')
    component.addScript()
    expect(component.openAddScriptDialog).toHaveBeenCalled()
  });

  it('openEditScriptDialog() should open the dialog and load the datasource on close', () => {
    // TODO: test that dialog.afterAllClosed is set up
    const data = MOCK_SCRIPTS[0]
    spyOn(component.dialog, 'open')
    component.openEditScriptDialog(data)
    expect(component.dialog.open).toHaveBeenCalledWith(EditScriptComponent, { width: '80%', data })
  })

  it('openAddScriptDialog() should open the dialog and load the datasource on close', () => {
    // TODO: test that dialog.afterAllClosed is set up
    spyOn(component.dialog, 'open')
    component.openAddScriptDialog()
    expect(component.dialog.open).toHaveBeenCalledWith(AddScriptComponent, { width: '80%' })
  })

  it('syncWithFilesystem() should call apiService.syncScripts and datasource.load', () => {
    spyOn(component['apiService'], 'syncScripts').and.callThrough()
    spyOn(component.dataSource, 'load')
    component.syncWithFilesystem()
    expect(component['apiService'].syncScripts).toHaveBeenCalled()
    expect(component.dataSource.load).toHaveBeenCalled()
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
