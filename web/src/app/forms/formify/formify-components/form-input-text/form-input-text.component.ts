import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-input-text',
  templateUrl: './form-input-text.component.html',
  styleUrls: ['./form-input-text.component.scss']
})
export class FormInputTextComponent implements OnInit {
  @Input() model: any = {}
  @Input() label: string = ''
  @Input() name: string = ''

  constructor() { }

  getLabel() {
    return this.label || this.name
  }

  ngOnInit(): void {
  }

}
