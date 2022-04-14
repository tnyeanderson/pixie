import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { MockApiService } from 'src/app/services/api.service.mock';
import { ScriptsListComponent } from './scripts-list.component';


describe('ScriptsListComponent', () => {
  let component: ScriptsListComponent;
  let fixture: ComponentFixture<ScriptsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: new MockApiService() },
      ],
      imports: [HttpClientModule, MatSnackBarModule, MatDialogModule],
      declarations: [ScriptsListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
