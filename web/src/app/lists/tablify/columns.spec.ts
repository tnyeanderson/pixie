import { Column } from './columns';


describe('Column class', () => {
  let obj: Column

  beforeEach(() => {
    obj = new Column('TESTCOLUMN', 'number')
  });

  it('should compile', () => {
    expect(obj).toBeTruthy();
  });

  // it('getValue() should format timestamps', () => {
  //   obj.type = 'timestamp'
  //   expect(obj.getValue({}))
  // })

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
