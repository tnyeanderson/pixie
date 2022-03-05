import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(public dialog: MatDialog) { }

  ask(callback: Function, prompt?: string) {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {prompt, callback},
    })
  }


}
