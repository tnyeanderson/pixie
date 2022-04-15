import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormifyModule } from '../formify/formify.module';
import { AddScriptComponent } from './add-script.component';


describe('AddScriptComponent', () => {
  let component: AddScriptComponent;
  let fixture: ComponentFixture<AddScriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }],
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
});
