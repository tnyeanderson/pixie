import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmService } from 'src/app/services/confirm/confirm.service';
import { BaseFormComponent } from '../base-form/base-form.component';

@Component({
  selector: 'app-form-buttons',
  templateUrl: './form-buttons.component.html',
  styleUrls: ['./form-buttons.component.scss']
})
export class FormButtonsComponent implements OnInit {
  @Input() model: any
  @Input() action: string  = 'Save'
  @Input() showDelete: boolean = false
  @Input() validate: Function = () => true
  @Input() onClose: Function = () => { }
  @Input() onSubmit: Function = () => { }
  @Input() onDelete: Function = () => { }

  constructor(public dialogRef: MatDialogRef<BaseFormComponent>, public confirm: ConfirmService) { }

  delete() {
    this.confirm.ask(() => {
      this.onDelete(this.model.ID)
      this.close()
    }, 'Delete script?')
  }

  close() {
    this.dialogRef.close()
    this.onClose()
  }

  submit() {
    this.onSubmit()
  }

  deleteAllowed() {
    return this.showDelete && this.model.ID
  }

  ngOnInit(): void {
  }

}
