import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormifyModule } from '../../formify.module';
import { BaseFormComponent } from './base-form.component';


describe('BaseFormComponent', () => {
  let component: BaseFormComponent;
  let fixture: ComponentFixture<BaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }],
      imports: [
        MatDialogModule,
        FormifyModule,
        NoopAnimationsModule,
      ],
      declarations: [BaseFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseFormComponent);
    component = fixture.componentInstance;
    // Don't call this yet, calls ngOnInit()
    // fixture.detectChanges();
  });

  it('should create', () => {
    // TODO: Test that ngOnInit effects are handled?
    // fixture.detectChanges()
    expect(component).toBeTruthy();
  });

  it('validate() should return true by default', () => {
    expect(component.validate()).toBeTrue();
  });

  it('ngOnInit() should apply initialData to model', () => {
    const model = {name: 'TESTMODEL'}
    const initialData = {data: 'TESTINITIALDATA'}
    const expected = {name: 'TESTMODEL', data: 'TESTINITIALDATA'}
    component.model = model
    component.initialData = initialData
    spyOn(Object, 'assign').and.callThrough()
    component.ngOnInit()
    expect(Object.assign).toHaveBeenCalledWith(model, initialData)
    expect(component.model).toEqual(expected)
  })
});
