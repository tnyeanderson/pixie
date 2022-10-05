import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddBootConfigComponent } from 'src/app/forms/add-boot-config/add-boot-config.component';
import { EditBootConfigComponent } from 'src/app/forms/edit-boot-config/edit-boot-config.component';
import { ApiService } from 'src/app/services/api.service';
import { MockApiService, MOCK_BOOT_CONFIGS } from 'src/app/services/api.service.mock';
import { BootConfigItem } from 'src/types';
import { TablifyModule } from '../../tablify/tablify.module';
import { BootConfigsListComponent } from './boot-configs-list.component';


describe('BootConfigsListComponent', () => {
  let component: BootConfigsListComponent;
  let fixture: ComponentFixture<BootConfigsListComponent>;

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
        BootConfigsListComponent,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BootConfigsListComponent);
    component = fixture.componentInstance;
    // Don't call this yet, calls ngOnInit()
    // fixture.detectChanges();
  });

  it('should create', () => {
    // TODO: Test that ngOnInit effects are handled?
    // fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('editBootConfig() should call openEditBootConfigDialog()', () => {
    const i1 = MOCK_BOOT_CONFIGS[0]
    spyOn(component, 'openEditBootConfigDialog')
    component.editBootConfig(i1)
    expect(component.openEditBootConfigDialog).toHaveBeenCalledWith(i1)
  });

  it('addBootConfig() should call openAddBootConfigDialog()', () => {
    spyOn(component, 'openAddBootConfigDialog')
    component.addBootConfig()
    expect(component.openAddBootConfigDialog).toHaveBeenCalled()
  });

  it('deleteBootConfig() should call apiService.deleteBootConfig() and loadData()', () => {
    const id = 55
    const bootConfig = new BootConfigItem()
    bootConfig.id = id
    spyOn(component['apiService'], 'deleteBootConfig').and.callThrough()
    spyOn(component, 'loadData')
    component.deleteBootConfig(bootConfig)
    expect(component['apiService'].deleteBootConfig).toHaveBeenCalledWith(id)
    expect(component.loadData).toHaveBeenCalled()
  });

  it('openEditBootConfigDialog() should open the dialog and load the datasource on close', () => {
    // TODO: test that dialog.afterAllClosed is set up
    const data = MOCK_BOOT_CONFIGS[0]
    spyOn(component.dialog, 'open')
    spyOn(component, 'loadData')
    component.openEditBootConfigDialog(data)
    expect(component.dialog.open).toHaveBeenCalledWith(EditBootConfigComponent, {width: '80%', data})
    expect(component.loadData).toHaveBeenCalled()
  })

  it('openAddBootConfigDialog() should open the dialog and load the datasource on close', () => {
    // TODO: test that dialog.afterAllClosed is set up
    spyOn(component.dialog, 'open')
    spyOn(component, 'loadData')
    component.openAddBootConfigDialog()
    expect(component.dialog.open).toHaveBeenCalledWith(AddBootConfigComponent, {width: '80%'})
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
