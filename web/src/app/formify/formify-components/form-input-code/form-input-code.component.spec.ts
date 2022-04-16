import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormifyModule } from '../../formify.module';
import { FormInputCodeComponent } from './form-input-code.component';


describe('FormInputCodeComponent', () => {
  let component: FormInputCodeComponent;
  let fixture: ComponentFixture<FormInputCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInputCodeComponent ],
      imports: [
        FormifyModule,
        NoopAnimationsModule,
      ]
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
