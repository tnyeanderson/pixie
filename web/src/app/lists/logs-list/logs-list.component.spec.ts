import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReloadButtonModule } from 'src/app/fragments/reload-button/reload-button.module';
import { ApiService } from 'src/app/services/api.service';
import { MockApiService } from 'src/app/services/api.service.mock';
import { ConfirmService } from 'src/app/services/confirm/confirm.service';
import { ConfirmServiceStub, MatDialogRefStub, MAT_DIALOG_DATA_STUB } from 'src/testing/stubs';
import { TablifyModule } from '../../tablify/tablify.module';
import { LogsListComponent } from './logs-list.component';


describe('LogsListComponent', () => {
  let component: LogsListComponent;
  let fixture: ComponentFixture<LogsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: new MockApiService() },
        { provide: MatDialogRef, useValue: MatDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: MAT_DIALOG_DATA_STUB },
        { provide: ConfirmService, useValue: ConfirmServiceStub },
      ],
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        MatIconModule,
        TablifyModule,
        NoopAnimationsModule,
        ReloadButtonModule,
      ],
      declarations: [
        LogsListComponent,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsListComponent);
    component = fixture.componentInstance;
    // Don't call this yet, calls ngOnInit()
    // fixture.detectChanges();
  });

  it('should create', () => {
    // TODO: Test that ngOnInit effects are handled?
    // fixture.detectChanges();
    expect(component).toBeTruthy();
  });

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
