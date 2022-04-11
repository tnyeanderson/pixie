import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormInputUploadInlineComponent } from './form-input-upload-inline.component';


describe('FormInputUploadInlineComponent', () => {
  let component: FormInputUploadInlineComponent;
  let fixture: ComponentFixture<FormInputUploadInlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInputUploadInlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputUploadInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
