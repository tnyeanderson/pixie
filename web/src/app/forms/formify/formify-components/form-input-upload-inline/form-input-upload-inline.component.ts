import { Component, Input, OnInit } from '@angular/core';
import { UploadInline } from 'src/types';

@Component({
  selector: 'app-form-input-upload-inline',
  templateUrl: './form-input-upload-inline.component.html',
  styleUrls: ['./form-input-upload-inline.component.scss']
})
export class FormInputUploadInlineComponent implements OnInit {
  @Input() model: UploadInline = new UploadInline()
  @Input() fileAdded: Function = () => {}
  @Input() fileRemoved: Function = () => {}

  constructor() { }

  ngOnInit(): void {

  }

}