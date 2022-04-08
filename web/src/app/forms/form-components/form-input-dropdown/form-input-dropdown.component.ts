import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-input-dropdown',
  templateUrl: './form-input-dropdown.component.html',
  styleUrls: ['./form-input-dropdown.component.scss']
})
export class FormInputDropdownComponent implements OnInit {
  @Input() model: any
  @Input() options: any[] = []
  @Input() name: string = ''
  @Input() label: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
