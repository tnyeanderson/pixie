import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseFormNewComponent } from './base-form.component';


describe('BaseFormComponent', () => {
  let component: BaseFormNewComponent;
  let fixture: ComponentFixture<BaseFormNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseFormNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseFormNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
