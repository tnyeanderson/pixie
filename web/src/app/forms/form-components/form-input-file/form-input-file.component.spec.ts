import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputFileComponent } from './form-input-file.component';

describe('FormInputFileComponent', () => {
  let component: FormInputFileComponent;
  let fixture: ComponentFixture<FormInputFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInputFileComponent ]
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
});
