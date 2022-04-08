import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmService } from 'src/app/services/confirm/confirm.service';
import { Field } from '../fields';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss']
})
export class BaseFormComponent implements OnInit {
  model: any = {};

  @Input() fields: Field[] = []
  @Input() onClose: Function = () => { }
  @Input() onSubmit: Function = () => { }
  @Input() onDelete: Function = () => { }
  @Input() validate: Function = (f: Form): boolean => true
  @Input() action: string = 'Save'
  @Input() initialData: any = {}

  constructor(public dialogRef: MatDialogRef<BaseFormComponent>, public confirm: ConfirmService) { }

  delete(id: number) {
    this.confirm.ask(() => {
      this.onDelete(id)
      this.close()
    }, 'Delete script?')
  }

  close() {
    this.dialogRef.close()
    this.onClose()
  }

  submit(f: NgForm) {
    this.onSubmit(f)
  }

  ngOnInit(): void {
    Object.assign(this.model, this.initialData)
  }

}
