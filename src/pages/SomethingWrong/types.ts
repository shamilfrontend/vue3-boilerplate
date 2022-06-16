import type { ComputedRef } from 'vue';

import type { RouteName } from '@/constants';

export type SomethingWrongPropCode = 403 | 404;

export interface SomethingWrongProps {
  code: SomethingWrongPropCode;
}

export interface SomethingWrongInstance {
  R_HOME: RouteName.HOME;
  imageSrc: ComputedRef<string>;
  titleText: ComputedRef<string>;
}
