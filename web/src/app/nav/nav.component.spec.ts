import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav.component';
import { NavModule } from './nav.module';


describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [
        NoopAnimationsModule,
        NavModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
