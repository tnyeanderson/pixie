import { Column } from './columns';


describe('Column class', () => {
  let obj: Column

  beforeEach(() => {
    obj = new Column('TESTCOLUMN', 'number')
  });

  it('should compile', () => {
    expect(obj).toBeTruthy();
  });

  it('getValue() should format timestamps', () => {
    obj.type = 'timestamp'
    const test = {
      TESTCOLUMN: '2022-04-11T03:15:58.548004992-04:00'
    }
    const date = new Date(test.TESTCOLUMN)
    const val = obj.getValue(test)
    expect(val).toEqual(date.toLocaleString())
  })

  it('getValue() should return non-timestamp values "as is"', () => {
    obj.type = 'string'
    const test = {
      TESTCOLUMN: '2022-04-11T03:15:58.548004992-04:00'
    }
    const val = obj.getValue(test)
    expect(val).toEqual(test.TESTCOLUMN)

    obj.type = 'number'
    const test2 = {
      TESTCOLUMN: 5
    }
    const val2 = obj.getValue(test2)
    expect(val2).toEqual(test2.TESTCOLUMN as any)
  })

  it('isTimestamp() should return true if this.type === "timestamp"', () => {
    expect(obj.isTimestamp()).toBeFalse()
    obj.type = 'timestamp'
    expect(obj.isTimestamp()).toBeTrue()
  })

  it('isLongText() should return true if this.type === "longtext"', () => {
    expect(obj.isLongText()).toBeFalse()
    obj.type = 'longtext'
    expect(obj.isLongText()).toBeTrue()
  })
});
