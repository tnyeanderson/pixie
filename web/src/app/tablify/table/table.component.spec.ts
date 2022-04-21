import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmService } from 'src/app/services/confirm/confirm.service';
import { ConfirmServiceStub, MatDialogRefStub, MAT_DIALOG_DATA_STUB } from 'src/testing/stubs';
import { DeviceItem } from 'src/types';
import { Column } from '../columns';
import { TableComponent } from './table.component';


describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialogRef, useValue: MatDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: MAT_DIALOG_DATA_STUB },
        { provide: ConfirmService, useValue: ConfirmServiceStub },
      ],
      declarations: [TableComponent],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    // Don't call this yet, calls ngOnInit()
    // fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('add() should do nothing by default', () => {
    spyOn(component, 'add').and.callThrough()
    component.add()
    expect(component.add).toHaveBeenCalled()
  })

  it('edit() should do nothing by default', () => {
    spyOn(component, 'edit').and.callThrough()
    component.edit()
    expect(component.edit).toHaveBeenCalled()
  })

  it('delete() should do nothing by default', () => {
    spyOn(component, 'delete').and.callThrough()
    component.delete()
    expect(component.delete).toHaveBeenCalled()
  })

  it('getDisplayedColumns() should call getColumnNames() and send the result to addExtraColumns()', () => {
    const columns = ['name1', 'name2']
    const withExtra = [...columns, 'extra']
    spyOn(component, 'getColumnNames').and.returnValue(columns)
    spyOn(component, 'addExtraColumns').and.returnValue(withExtra)
    const result = component.getDisplayedColumns()
    expect(component.getColumnNames).toHaveBeenCalled()
    expect(component.addExtraColumns).toHaveBeenCalledWith(columns)
    expect(result).toEqual(withExtra)
  })

  it('getColumnNames() should map all column[i].name into an array', () => {
    const columns = [
      { name: 'col1' },
      { name: 'col2' }
    ]
    const expected = ['col1', 'col2']
    component.columns = columns as Column[]
    expect(component.getColumnNames()).toEqual(expected)
  })

  it('addExtraColumns() should add the extras column', () => {
    const colNames = ['col1', 'col2']
    const expected = [...colNames, 'extras']
    const result = component.addExtraColumns(colNames)
    expect(result).toEqual(expected)
  })

  it('editItem() should call edit()', () => {
    const row = { test: 'value' }
    spyOn(component, 'edit')
    component.editItem(row)
    expect(component.edit).toHaveBeenCalledWith(row)
  })

  it('deleteItem() should call delete() after asking for confirmation', () => {
    const device = new DeviceItem()
    device.ID = 55
    spyOn(component['confirm'], 'ask').and.callThrough()
    spyOn(component, 'delete')
    component.deleteItem(device)
    expect(component['confirm'].ask).toHaveBeenCalled()
    expect(component.delete).toHaveBeenCalledWith(device)
  })

  it('updateDisplayedColumns() should set displayedColumns to getDisplayedColumns()', () => {
    const fakeResult = ['col1', 'col2']
    spyOn(component, 'getDisplayedColumns').and.returnValue(fakeResult)
    component.updateDisplayedColumns()
    expect(component.displayedColumns).toEqual(fakeResult)
  })

  it('ngAfterViewInit() should set the datasource parameters and call updateDisplayedColumns()', () => {
    const sorter = { sorter: 'test' }
    const paginator = { paginator: 'test' }
    const dataSource = { dataSource: 'test' }
    spyOn(component, 'updateDisplayedColumns')
    component.sort = sorter as any
    component.paginator = paginator as any
    component.dataSource = dataSource as any
    component.table = {} as any
    component.ngAfterViewInit()
    expect(component.dataSource.sort).toEqual(sorter as any)
    expect(component.dataSource.paginator).toEqual(paginator as any)
    expect(component.table.dataSource).toEqual(dataSource as any)
    expect(component.updateDisplayedColumns).toHaveBeenCalled()
  })
});
