import { UploadInline } from './upload-inline';


describe('UploadInline class', () => {
  let obj: UploadInline

  beforeEach(() => {
    obj = new UploadInline()
  });

  it('should create', () => {
    expect(obj).toBeTruthy();
  });

  it('isInline() should return true if this.format is inline', () => {
    // Should be upload by default
    expect(obj.isInline()).toBeFalse()
    obj.format = obj.formats.inline
    expect(obj.isInline()).toBeTrue()
  })

  it('isUpload() should return true if this.format is upload', () => {
    // Should be upload by default
    expect(obj.isUpload()).toBeTrue()
    obj.format = obj.formats.inline
    expect(obj.isUpload()).toBeFalse()
  })
});
