import { Injectable } from '@angular/core';
import { UploadInline } from '../formify-components/form-input-upload-inline/upload-inline';

@Injectable({
  providedIn: 'root'
})
export class UploadInlineService {
  constructor() { }

  create() {
    return new UploadInline()
  }
}
