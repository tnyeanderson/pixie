import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputDropdownComponent } from './form-input-dropdown.component';

describe('FormInputDropdownComponent', () => {
  let component: FormInputDropdownComponent;
  let fixture: ComponentFixture<FormInputDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInputDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
