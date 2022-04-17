import { MOCK_FILE } from 'src/app/services/api.service.mock';
import { UploadInline } from './upload-inline';
import { MOCK_INLINE_CONTENT } from './upload-inline.mock';


describe('UploadInline class', () => {
  let obj: UploadInline

  beforeEach(() => {
    obj = new UploadInline()
  });

  it('should create', () => {
    expect(obj).toBeTruthy();
  });

  it('setModeInline should set format to formats.inline', () => {
    obj.format = -1
    expect(obj.format).not.toEqual(obj.formats.inline)
    obj.setModeInline()
    expect(obj.format).toEqual(obj.formats.inline)
  })

  it('setModeUpload should set format to formats.upload', () => {
    obj.format = -1
    expect(obj.format).not.toEqual(obj.formats.upload)
    obj.setModeUpload()
    expect(obj.format).toEqual(obj.formats.upload)
  })

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

  it('setInlineContent() should set scriptContent.Content', () => {
    const newContent = 'NEW CONTENT'
    // Should be empty by default
    expect(obj.scriptContent.Content).toEqual('')
    obj.setInlineContent(newContent)
    expect(obj.scriptContent.Content).toEqual(newContent)
  })

  it('getInline() should return scriptContent.Content', () => {
    const newContent = 'NEW CONTENT'
    // Should be empty by default
    expect(obj.getInline()).toEqual('')
    obj.scriptContent.Content = newContent
    expect(obj.getInline()).toEqual(newContent)
  })

  it('getFile() should return files[0]', () => {
    const file = MOCK_FILE
    // Should be undefined by default
    expect(obj.getFile()).not.toBeDefined()
    obj.files = [file]
    expect(obj.getFile()).toEqual(file)
  })

  it('hasContent() should return true if hasInlineContent()', () => {
    spyOn(obj, 'hasInlineContent').and.returnValue(true)
    spyOn(obj, 'hasFileContent')
    expect(obj.hasContent()).toBeTrue()
    expect(obj.hasFileContent).not.toHaveBeenCalled()
  })

  it('hasContent() should return true if hasFileContent()', () => {
    spyOn(obj, 'hasInlineContent').and.returnValue(false)
    spyOn(obj, 'hasFileContent').and.returnValue(true)
    expect(obj.hasContent()).toBeTrue()
    expect(obj.hasInlineContent).toHaveBeenCalled()
  })

  it('hasContent() should return false if !hasInlineContent() and !hasFileContent()', () => {
    spyOn(obj, 'hasInlineContent').and.returnValue(false)
    spyOn(obj, 'hasFileContent').and.returnValue(false)
    expect(obj.hasContent()).toBeFalse()
    expect(obj.hasInlineContent).toHaveBeenCalled()
    expect(obj.hasFileContent).toHaveBeenCalled()
  })

  it('hasInlineContent() should return true if isInline() and scriptContent.Content', () => {
    spyOn(obj, 'isInline').and.returnValue(true)
    obj.scriptContent.Content = 'HAS CONTENT'
    expect(obj.hasInlineContent()).toBeTrue()
  })

  it('hasInlineContent() should return false if !isInline() even if scriptContent.Content', () => {
    spyOn(obj, 'isInline').and.returnValue(false)
    obj.scriptContent.Content = 'HAS CONTENT'
    expect(obj.hasInlineContent()).toBeFalse()
  })

  it('hasInlineContent() should return false if isInline() if !scriptContent.Content', () => {
    spyOn(obj, 'isInline').and.returnValue(true)
    obj.scriptContent.Content = ''
    expect(obj.hasInlineContent()).toBeFalse()
  })

  it('hasFileContent() should return true if isUpload() and files has items', () => {
    spyOn(obj, 'isUpload').and.returnValue(true)
    obj.files = [MOCK_FILE]
    expect(obj.hasFileContent()).toBeTrue()
  })

  it('hasFileContent() should return false if !isUpload() even if files has items', () => {
    spyOn(obj, 'isUpload').and.returnValue(false)
    obj.files = [MOCK_FILE]
    expect(obj.hasFileContent()).toBeFalse()
  })

  it('hasFileContent() should return false if isUpload() if files has no items', () => {
    spyOn(obj, 'isUpload').and.returnValue(true)
    obj.files = []
    expect(obj.hasFileContent()).toBeFalse()
  })

  it('do() should call ifUpload if hasFileContent()', () => {
    const ifUpload = jasmine.createSpy()
    const ifInline = jasmine.createSpy()
    const otherwise = jasmine.createSpy()
    spyOn(obj, 'hasFileContent').and.returnValue(true)
    obj.do(ifUpload, ifInline, otherwise)
    expect(ifUpload).toHaveBeenCalled()
    expect(ifInline).not.toHaveBeenCalled()
    expect(otherwise).not.toHaveBeenCalled()
  })

  it('do() should call ifInline if hasInlineContent()', () => {
    const ifUpload = jasmine.createSpy()
    const ifInline = jasmine.createSpy()
    const otherwise = jasmine.createSpy()
    spyOn(obj, 'hasInlineContent').and.returnValue(true)
    obj.do(ifUpload, ifInline, otherwise)
    expect(ifUpload).not.toHaveBeenCalled()
    expect(ifInline).toHaveBeenCalled()
    expect(otherwise).not.toHaveBeenCalled()
  })

  it('do() should call otherwise if !hasFileContent and !hasInlineContent()', () => {
    const ifUpload = jasmine.createSpy()
    const ifInline = jasmine.createSpy()
    const otherwise = jasmine.createSpy()
    spyOn(obj, 'hasInlineContent').and.returnValue(false)
    spyOn(obj, 'hasFileContent').and.returnValue(false)
    obj.do(ifUpload, ifInline, otherwise)
    expect(ifUpload).not.toHaveBeenCalled()
    expect(ifInline).not.toHaveBeenCalled()
    expect(otherwise).toHaveBeenCalled()
  })
});
