import { Observable, of } from 'rxjs';
import { TableDataSource } from './table-datasource';

// TODO: Find out why this file can't be named table-datasource.spec.ts without causing test errors

describe('TableDataSource', () => {
  let obj: TableDataSource;

  beforeEach(() => {
    obj = new TableDataSource()
  });

  it('should compile', () => {
    expect(obj).toBeTruthy();
  });

  it('updateData() should set this.data and call updated.next()', () => {
    const testdata = {data: 'test'} as any
    spyOn(obj.updated, 'next')
    obj.updateData(testdata)
    expect(obj.data).toBe(testdata)
    expect(obj.updated.next).toHaveBeenCalledWith(true)
  })

  it('connect() should return an observable that has been paged and sorted', (done) => {
    const fakeOmni = {pipe: (val: any) => val} as any
    const fakeSuccess = 'success' as any
    spyOn(obj, 'omniObservable').and.returnValue(fakeOmni)
    spyOn(obj, 'pageAndSort').and.returnValue(of(fakeSuccess) as any)
    obj.connect().subscribe(val => {
      expect(val).toEqual(fakeSuccess)
      done()
    })
    expect(obj.omniObservable).toHaveBeenCalled()
    expect(obj.pageAndSort).toHaveBeenCalled()
  })

  it('disconnect() should do nothing', () => {
    spyOn(obj, 'disconnect').and.callThrough()
    obj.disconnect()
    expect(obj.disconnect).toHaveBeenCalled()
  })

  it('getPagedData() should return a the spliced page of results from the data array', () => {
    const testdata: any[] = ['val0', 'val1', 'val2', 'val3', 'val4', 'val5']
    const expected: any[] = ['val2', 'val3', 'val4']
    obj.paginator = {pageSize: 3} as any
    spyOn(obj, 'getStartIndex').and.returnValue(2)
    spyOn(testdata, 'splice').and.callThrough()
    const result = obj.getPagedData(testdata)
    expect(testdata.splice).toHaveBeenCalled()
    expect(result).toEqual(expected)
  })

  it('getStartIndex() should get the starting index for the page of results', () => {
    obj.paginator = {} as any
    obj.paginator.pageIndex = 3
    obj.paginator.pageSize = 5
    expect(obj.getStartIndex()).toEqual(15)
    obj.paginator.pageIndex = 7
    obj.paginator.pageSize = 12
    expect(obj.getStartIndex()).toEqual(84)
  })

  it('sortIsActive() should return true if sort.active ', () => {
    obj.sort = {active: ''} as any
    expect(obj.sortIsActive()).toBeFalse()
    obj.sort.active = 'active'
    expect(obj.sortIsActive()).toBeTrue()
  })

  it('getSortedData() should immediately return data as given if !sortIsActive', () => {
    const testdata = [{data: 'test'}] as any
    spyOn(obj, 'sortIsActive').and.returnValue(false)
    spyOn(obj, 'localeSortInPlace')
    const result = obj.getSortedData(testdata)
    expect(obj.localeSortInPlace).not.toHaveBeenCalled()
    expect(result).toBe(testdata)
  })

  it('getSortedData() should call localeSortInPlace if sortIsActive and not data.reverse if !isDescending()', () => {
    const testdata = [{data: 'test'}] as any
    const testkey = 'key1'
    spyOn(obj, 'sortIsActive').and.returnValue(true)
    spyOn(obj, 'isDescending').and.returnValue(false)
    spyOn(testdata, 'reverse')
    spyOn(obj, 'localeSortInPlace')
    obj.sort = {active: testkey} as any
    const result = obj.getSortedData(testdata)
    expect(obj.localeSortInPlace).toHaveBeenCalledWith(testdata, testkey)
    expect(testdata.reverse).not.toHaveBeenCalled()
    expect(result).toBe(testdata)
  })

  it('getSortedData() should call localeSortInPlace if sortIsActive and data.reverse if isDescending()', () => {
    const testdata = [{data: 'test'}] as any
    const testkey = 'key1'
    spyOn(obj, 'sortIsActive').and.returnValue(true)
    spyOn(obj, 'isDescending').and.returnValue(true)
    spyOn(testdata, 'reverse')
    spyOn(obj, 'localeSortInPlace')
    obj.sort = {active: testkey} as any
    const result = obj.getSortedData(testdata)
    expect(obj.localeSortInPlace).toHaveBeenCalledWith(testdata, testkey)
    expect(testdata.reverse).toHaveBeenCalled()
    expect(result).toBe(testdata)
  })

  it('localeSortInPlace() should sort the array naturally as strings', () => {
    const key = 'key1'
    const toSort = [
      200,
      10,
      1,
      'B',
      3,
      '0002',
      'a',
      0
    ].map(n => {return {key1: n}})
    const expected = [
      0,
      1,
      '0002',
      3,
      10,
      200,
      'a',
      'B',
    ].map(n => {return {key1: n}})
    obj.localeSortInPlace(toSort, key)
    expect(toSort).toEqual(expected)
  })

  it('localeCompare() should return -1, 0, or 1 based on comparison result', () => {
    expect(obj.localeCompare('B', 'a')).toEqual(1)
    expect(obj.localeCompare('a', 'B')).toEqual(-1)
    expect(obj.localeCompare(3, 10)).toEqual(-1)
    expect(obj.localeCompare('0035', 23)).toEqual(1)
    expect(obj.localeCompare('0001', 1)).toEqual(0)
    expect(obj.localeCompare('0001', '1')).toEqual(0)
  })
  
  it('isDescending() should return true only if sort.direction === desc', () => {
    obj.sort = {direction: 'wrong'} as any
    expect(obj.isDescending()).toBeFalse()
    obj.sort.direction = 'desc'
    expect(obj.isDescending()).toBeTrue()
  })
})
