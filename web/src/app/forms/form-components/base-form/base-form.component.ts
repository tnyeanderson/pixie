import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmService } from 'src/app/services/confirm/confirm.service';
import { Field } from '../../fields';

@Component({
  selector: 'app-base-form-new',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss']
})
export class BaseFormNewComponent implements OnInit {
  @Input() model: any = {};

  @Input() validate: Function = (): boolean => true
  @Input() initialData: any = {}

  constructor(public dialogRef: MatDialogRef<BaseFormNewComponent>, public confirm: ConfirmService) { }

  ngOnInit(): void {
    Object.assign(this.model, this.initialData)
  }

}
