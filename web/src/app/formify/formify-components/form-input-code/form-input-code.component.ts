import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-input-code',
  templateUrl: './form-input-code.component.html',
  styleUrls: ['./form-input-code.component.scss']
})
export class FormInputCodeComponent implements OnInit {
  @Input() model: any = {}
  @Input() name: string = ''
  @Input() label: string = ''

  constructor() { }

  getLabel() {
    return this.label || this.name
  }

  ngOnInit(): void { }

}
