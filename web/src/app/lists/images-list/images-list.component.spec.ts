import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { MockApiService } from 'src/app/services/api.service.mock';
import { ImagesListComponent } from './images-list.component';


describe('ImagesListComponent', () => {
  let component: ImagesListComponent;
  let fixture: ComponentFixture<ImagesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: new MockApiService() },
      ],
      imports: [HttpClientModule, MatSnackBarModule, MatDialogModule],
      declarations: [ImagesListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
