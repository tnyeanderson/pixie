import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRefStub, MAT_DIALOG_DATA_STUB } from 'src/testing/stubs';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';


describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: MatDialogRef, useValue: MatDialogRefStub }, { provide: MAT_DIALOG_DATA, useValue: MAT_DIALOG_DATA_STUB }],
      imports: [MatDialogModule],
      declarations: [ConfirmationDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close() should close the dialog', () => {
    spyOn(component.dialogRef, 'close')
    component.close()
    expect(component.dialogRef.close).toHaveBeenCalled()
  });

  it('confirm() should close the dialog and run the callback', () => {
    spyOn(component.dialogRef, 'close')
    spyOn(component.data, 'callback')
    component.confirm()
    expect(component.dialogRef.close).toHaveBeenCalled()
    expect(component.data.callback).toHaveBeenCalled()
  });
});
