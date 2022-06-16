import type { Nillable, Optional } from '#/types';

export const getEnumValue = <T extends object>(
  enumObject: T,
  key: Nillable<string>
): Optional<T[keyof T]> => {
  if (key === null || key === undefined) return undefined;
  return new Map(Object.entries(enumObject)).get(key);
};
