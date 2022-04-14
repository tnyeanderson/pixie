import { TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmService } from './confirm.service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';


describe('ConfirmService', () => {
  let service: ConfirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }],
      imports: [MatDialogModule],
    });
    service = TestBed.inject(ConfirmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('ask() without a prompt should open the confirmation dialog', () => {
    const callback = () => {}
    spyOn(service.dialog, 'open')
    service.ask(callback)
    expect(service.dialog.open).toHaveBeenCalledWith(ConfirmationDialogComponent, {data: {prompt: undefined, callback}})
  });
  
  it('ask() with a prompt should open the confirmation dialog', () => {
    const prompt = 'test prompt'
    const callback = () => {}
    spyOn(service.dialog, 'open')
    service.ask(callback, prompt)
    expect(service.dialog.open).toHaveBeenCalledWith(ConfirmationDialogComponent, {data: {prompt, callback}})
  });
});
