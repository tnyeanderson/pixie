import { Component, Input, OnInit } from '@angular/core';
import { UploadInlineService } from '../../formify-services/upload-inline.service';
import { UploadInline } from './upload-inline';

@Component({
  selector: 'app-form-input-upload-inline',
  templateUrl: './form-input-upload-inline.component.html',
  styleUrls: ['./form-input-upload-inline.component.scss'],
})
export class FormInputUploadInlineComponent implements OnInit {
  @Input() model!: UploadInline
  @Input() fileAdded: Function = () => {}
  @Input() fileRemoved: Function = () => {}

  constructor() { }

  ngOnInit(): void {

  }

}
