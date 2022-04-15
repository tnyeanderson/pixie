import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmService } from 'src/app/services/confirm/confirm.service';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss']
})
export class BaseFormComponent implements OnInit {
  @Input() model: any = {};

  @Input() validate: Function = (): boolean => true
  @Input() initialData: any = {}

  constructor(public dialogRef: MatDialogRef<BaseFormComponent>, public confirm: ConfirmService) { }

  ngOnInit(): void {
    Object.assign(this.model, this.initialData)
  }

}
