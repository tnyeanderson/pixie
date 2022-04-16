import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmServiceStub, MatDialogRefStub, MAT_DIALOG_DATA_STUB } from 'src/testing/stubs';
import { FormifyModule } from '../../formify.module';
import { FormButtonsComponent } from './form-buttons.component';


describe('FormButtonsComponent', () => {
  let component: FormButtonsComponent;
  let fixture: ComponentFixture<FormButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: MatDialogRef, useValue: MatDialogRefStub }, { provide: MAT_DIALOG_DATA, useValue: MAT_DIALOG_DATA_STUB }],
      imports: [
        MatDialogModule,
        FormifyModule,
        NoopAnimationsModule,
      ],
      declarations: [FormButtonsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('doDelete() should open the confirmation dialog', () => {
    const ID = 55
    component.model = {ID}
    spyOn(component.confirm, 'ask').and.callFake(ConfirmServiceStub.ask)
    spyOn(component, 'delete')
    spyOn(component, 'close')
    component.doDelete()
    expect(component.confirm.ask).toHaveBeenCalled()
    expect(component.delete).toHaveBeenCalledWith(ID)
    expect(component.close).toHaveBeenCalled()
  });
  
  it('doClose() should close the dialog and run this.close()', () => {
    spyOn(component.dialogRef, 'close')
    spyOn(component, 'close')
    component.doClose()
    expect(component.dialogRef.close).toHaveBeenCalled()
    expect(component.close).toHaveBeenCalled()
  });

  it('doSubmit() should call this.submit()', () => {
    spyOn(component, 'submit')
    component.doSubmit()
    expect(component.submit).toHaveBeenCalled()
  });

  it('close() should do nothing', () => {
    spyOn(component, 'close').and.callThrough()
    component.close()
    expect(component.close).toHaveBeenCalled()
  });

  it('submit() should do nothing', () => {
    spyOn(component, 'submit').and.callThrough()
    component.submit()
    expect(component.submit).toHaveBeenCalled()
  });

  it('delete() should do nothing', () => {
    spyOn(component, 'delete').and.callThrough()
    component.delete()
    expect(component.delete).toHaveBeenCalled()
  });

  it('deleteAllowed() should return true only if showDelete is true and model.ID is set', () => {
    // showDelete is false by default
    component.model = {}
    expect(component.deleteAllowed()).toBeFalse()
    component.model.ID = 5
    expect(component.deleteAllowed()).toBeFalse()
    component.showDelete = true
    expect(component.deleteAllowed()).toBeTrue()
    component.model.ID = undefined
    expect(component.deleteAllowed()).toBeFalse()
  });
});
