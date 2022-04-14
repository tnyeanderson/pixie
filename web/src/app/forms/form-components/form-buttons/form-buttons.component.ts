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
  @Input() close: Function = () => { }
  @Input() submit: Function = () => { }
  @Input() delete: Function = () => { }

  constructor(public dialogRef: MatDialogRef<BaseFormComponent>, public confirm: ConfirmService) { }

  doDelete() {
    this.confirm.ask(() => {
      this.delete(this.model.ID)
      this.close()
    }, 'Delete script?')
  }

  doClose() {
    this.dialogRef.close()
    this.close()
  }

  doSubmit() {
    this.submit()
  }

  deleteAllowed() {
    return this.showDelete && this.model.ID
  }

  ngOnInit(): void {
  }

}
