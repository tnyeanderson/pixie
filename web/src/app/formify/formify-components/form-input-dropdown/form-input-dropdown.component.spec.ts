import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormifyModule } from '../../formify.module';
import { FormInputDropdownComponent } from './form-input-dropdown.component';


describe('FormInputDropdownComponent', () => {
  let component: FormInputDropdownComponent;
  let fixture: ComponentFixture<FormInputDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInputDropdownComponent ],
      imports: [
        FormifyModule,
        NoopAnimationsModule,
      ]
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
