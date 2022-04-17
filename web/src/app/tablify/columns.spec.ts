import { Column } from './columns';


describe('Column class', () => {
  let obj: Column

  beforeEach(() => {
    obj = new Column('TESTCOLUMN', 'number')
  });

  it('should compile', () => {
    expect(obj).toBeTruthy();
  });

  it('getDisplayName() should return a displayName if set', () => {
    const displayName = 'I HAVE A DISPLAY NAME'
    obj.displayName = displayName
    expect(obj.getDisplayName()).toEqual(displayName)
  })

  it('getDisplayName() should return name if displayName not set', () => {
    const name = 'I HAVE A NAME'
    obj.displayName = ''
    obj.name = name
    expect(obj.getDisplayName()).toEqual(name)
  })

  it('getValue() should format timestamps', () => {
    obj.type = 'timestamp'
    const test = {
      TESTCOLUMN: '2022-04-11T03:15:58.548004992-04:00'
    }
    spyOn(obj, 'getRawValue').and.returnValue(test.TESTCOLUMN)
    const date = new Date(test.TESTCOLUMN)
    const val = obj.getValue(test)
    expect(val).toEqual(date.toLocaleString())
  })

  it('getValue() should return non-timestamp values "as is"', () => {
    obj.type = 'string'
    const test = {
      TESTCOLUMN: '2022-04-11T03:15:58.548004992-04:00'
    }
    const rawValueSpy = spyOn(obj, 'getRawValue').and.returnValue(test.TESTCOLUMN)
    const val = obj.getValue(test)
    expect(val).toEqual(test.TESTCOLUMN)

    obj.type = 'number'
    const test2 = {
      TESTCOLUMN: 5
    }
    rawValueSpy.and.returnValue(test2.TESTCOLUMN)
    const val2 = obj.getValue(test2)
    expect(val2).toEqual(test2.TESTCOLUMN as any)
  })

  it('getRawValue() should give resolved value if resolve returns a value', () => {
    const defaultValue = 'DEFAULT'
    const resolvedValue = 'RESOLVED'
    obj.defaultValue = defaultValue
    spyOn(obj, 'getResolverKeys').and.returnValue(['goodkey', 'shouldwork'])
    spyOn(obj, 'resolve').and.returnValue(resolvedValue)
    expect(obj.getRawValue({})).toEqual(resolvedValue)
  })

  it('getRawValue() should give default value if resolve returns undefined', () => {
    const defaultValue = 'DEFAULT'
    obj.defaultValue = defaultValue
    spyOn(obj, 'getResolverKeys').and.returnValue(['badkey', 'shouldnotwork'])
    spyOn(obj, 'resolve').and.returnValue(undefined)
    expect(obj.getRawValue({})).toEqual(defaultValue)
  })

  it('resolve() should return undefined if resolution fails', () => {
    const testobj = {key1: 'value'}
    const keys = ['badkey', 'shouldnotwork']
    expect(obj.resolve(testobj, keys)).not.toBeDefined()
  })

  it('resolve() should return the value if resolution succeeds', () => {
    const testval = 'CORRECT!'
    const testobj = {
      key1: {
        key2: testval
      }
    }
    const keys = ['key1', 'key2']
    expect(obj.resolve(testobj, keys)).toEqual(testval)
  })

  it('getResolverKeys() should return the resolver array if it contains keys', () => {
    const name = 'shouldnotbeakey'
    const resolver = ['key1', 'key2']
    obj.name = name
    obj.resolver = resolver
    expect(obj.getResolverKeys()).toEqual(resolver)
  })

  it('getResolverKeys() should return [name] if resolver array is empty', () => {
    const name = 'shouldbeonlykey'
    const resolver: string[] = []
    obj.name = name
    obj.resolver = resolver
    expect(obj.getResolverKeys()).toEqual([name])
  })

  it('isTimestamp() should return true if this.type === "timestamp"', () => {
    obj.type = 'wrong'
    expect(obj.isTimestamp()).toBeFalse()
    obj.type = 'timestamp'
    expect(obj.isTimestamp()).toBeTrue()
  })

  it('isLongText() should return true if this.type === "longtext"', () => {
    obj.type = 'wrong'
    expect(obj.isLongText()).toBeFalse()
    obj.type = 'longtext'
    expect(obj.isLongText()).toBeTrue()
  })

  it('isBoolean() should return true if this.type === "boolean"', () => {
    obj.type = 'wrong'
    expect(obj.isBoolean()).toBeFalse()
    obj.type = 'boolean'
    expect(obj.isBoolean()).toBeTrue()
  })

  it('isNumber() should return true if this.type === "number"', () => {
    obj.type = 'wrong'
    expect(obj.isNumber()).toBeFalse()
    obj.type = 'number'
    expect(obj.isNumber()).toBeTrue()
  })

  it('isString() should return true if this.type === "string"', () => {
    obj.type = 'wrong'
    expect(obj.isString()).toBeFalse()
    obj.type = 'string'
    expect(obj.isString()).toBeTrue()
  })
});
