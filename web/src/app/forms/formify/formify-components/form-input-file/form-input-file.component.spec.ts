import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormifyModule } from '../../formify.module';
import { FormInputFileComponent } from './form-input-file.component';


describe('FormInputFileComponent', () => {
  let component: FormInputFileComponent;
  let fixture: ComponentFixture<FormInputFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FormInputFileComponent
      ],
      imports: [
        FormifyModule,
        NoopAnimationsModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fileAdded() should do nothing by default', () => {
    spyOn(component, 'fileAdded').and.callThrough()
    component.fileAdded()
    expect(component.fileAdded).toHaveBeenCalled()
  });

  it('fileRemoved() should do nothing by default', () => {
    spyOn(component, 'fileRemoved').and.callThrough()
    component.fileRemoved()
    expect(component.fileRemoved).toHaveBeenCalled()
  });

  it('onSelect() with multiple=true should push to this.files and call fileAdded', () => {
    // should be false by default
    component.multiple = true
    const f1 = {fileName: 'file1'} as unknown as File
    const f2 = {fileName: 'file2'} as unknown as File
    const addedFiles = [f1, f2]
    const testEvent = {addedFiles}
    spyOn(component, 'fileAdded')
    component.onSelect(testEvent)
    expect(component.files).toEqual(addedFiles)
    expect(component.fileAdded).toHaveBeenCalledWith(testEvent)
  });

  it('onSelect() with multiple=false should only ever set this.files[0]', () => {
    // should be false by default
    // component.multiple = true
    const f1 = {fileName: 'file1'} as unknown as File
    const f2 = {fileName: 'file2'} as unknown as File
    const addedFiles = [f1, f2]
    const testEvent = {addedFiles}
    spyOn(component, 'fileAdded')
    component.onSelect(testEvent)
    expect(component.files).toEqual([addedFiles[0]])
    expect(component.fileAdded).toHaveBeenCalledWith(testEvent)
  });

  it('onRemove() should remove the item from this.files and call fileRemoved()', () => {
    const f1 = {fileName: 'file1'} as unknown as File
    const f2 = {fileName: 'file2'} as unknown as File
    component.files = [f1, f2]
    spyOn(component, 'fileRemoved')
    component.onRemove(f1)
    expect(component.files).toEqual([f2])
    expect(component.fileRemoved).toHaveBeenCalledWith(f1)
  })
});
