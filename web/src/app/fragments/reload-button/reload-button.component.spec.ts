import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';

import { ReloadButtonComponent } from './reload-button.component';

describe('ReloadButtonComponent', () => {
  let component: ReloadButtonComponent;
  let fixture: ComponentFixture<ReloadButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReloadButtonComponent ],
      imports: [MatIconModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReloadButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('reload() should do nothing by default', () => {
    spyOn(component, 'reload').and.callThrough()
    component.reload()
    expect(component.reload).toHaveBeenCalled()
  })
});
