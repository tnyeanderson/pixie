import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextExpanderComponent } from './text-expander.component';


describe('TextExpanderComponent', () => {
  let component: TextExpanderComponent;
  let fixture: ComponentFixture<TextExpanderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextExpanderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextExpanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
