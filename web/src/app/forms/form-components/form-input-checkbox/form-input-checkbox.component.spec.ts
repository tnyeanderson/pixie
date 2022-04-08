import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputCheckboxComponent } from './form-input-checkbox.component';

describe('FormInputCheckboxComponent', () => {
  let component: FormInputCheckboxComponent;
  let fixture: ComponentFixture<FormInputCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInputCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
