import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormifyModule } from '../../formify.module';
import { FormInputCheckboxComponent } from './form-input-checkbox.component';


describe('FormInputCheckboxComponent', () => {
  let component: FormInputCheckboxComponent;
  let fixture: ComponentFixture<FormInputCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInputCheckboxComponent ],
      imports: [
        FormifyModule,
        NoopAnimationsModule,
      ]
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
