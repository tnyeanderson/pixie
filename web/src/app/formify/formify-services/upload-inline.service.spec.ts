import { TestBed } from '@angular/core/testing';
import { UploadInline } from '../formify-components/form-input-upload-inline/upload-inline';

import { UploadInlineService } from './upload-inline.service';

describe('UploadInlineService', () => {
  let service: UploadInlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadInlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create() should return a new UploadInline object', () => {
    const expected = new UploadInline()
    const actual = service.create()
    expect(actual).toEqual(expected)
    expect(actual).not.toBe(expected)
  })
});
