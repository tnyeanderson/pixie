import { Injectable } from '@angular/core';
import { MockUploadInline } from '../formify-components/form-input-upload-inline/upload-inline.mock';

@Injectable({
  providedIn: 'root'
})
export class MockUploadInlineService {
  constructor() { }

  create() {
    return new MockUploadInline()
  }
}
