import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-input-checkbox',
  templateUrl: './form-input-checkbox.component.html',
  styleUrls: ['./form-input-checkbox.component.scss']
})
export class FormInputCheckboxComponent implements OnInit {
  @Input() model: any = {}
  @Input() label: string = ''
  @Input() name: string = ''

  constructor() { }

  getLabel() {
    return this.label || this.name
  }

  ngOnInit(): void { }

}
