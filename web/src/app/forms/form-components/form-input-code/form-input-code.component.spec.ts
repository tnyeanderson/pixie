import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputCodeComponent } from './form-input-code.component';

describe('FormInputCodeComponent', () => {
  let component: FormInputCodeComponent;
  let fixture: ComponentFixture<FormInputCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInputCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
