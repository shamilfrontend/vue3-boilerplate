import { describe, it, expect } from 'vitest';

import { getEnumValue } from './index';

enum EnumObject {
  test = 'test',
  value = 'value',
  lastValue = 'lastValue'
}

enum EnumObjectNum {
  test,
  testSecond,
  num
}

const cases = [
  { object: EnumObject, key: 'test', expectedValue: 'test' },
  { object: EnumObject, key: 'null_test', expectedValue: undefined },
  { object: EnumObject, key: 'lastValue', expectedValue: 'lastValue' },
  { object: EnumObjectNum, key: '1', expectedValue: 'testSecond' },
  { object: EnumObjectNum, key: 'testSecond', expectedValue: 1 },
  { object: EnumObjectNum, key: '2', expectedValue: 'num' },
  { object: EnumObjectNum, key: '3', expectedValue: undefined },
  { object: EnumObjectNum, key: null, expectedValue: undefined },
  { object: EnumObjectNum, key: undefined, expectedValue: undefined }
];

describe('getEnumValue', () => {
  cases.forEach(({ object, key, expectedValue }) => {
    it(`should return ${expectedValue} when key is ${key} and enum is ${JSON.stringify(
      object
    )}`, () => {
      const result = getEnumValue(object, key);

      expect(result).toEqual(expectedValue);
    });
  });
});
