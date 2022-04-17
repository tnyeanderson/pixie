import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from 'src/app/services/api.service';
import { MockApiService } from 'src/app/services/api.service.mock';
import { TablifyModule } from '../../tablify/tablify.module';
import { LogsListComponent } from './logs-list.component';


describe('LogsListComponent', () => {
  let component: LogsListComponent;
  let fixture: ComponentFixture<LogsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: new MockApiService() },
      ],
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        TablifyModule,
        NoopAnimationsModule,
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
