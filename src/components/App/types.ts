import type { ComputedRef, Ref } from 'vue';

import type BaseLayout from '@/layouts/Base';
import type EmptyLayout from '@/layouts/Empty';

import type { Nullable } from '#/types';

export type CurrentLayout = Nullable<typeof EmptyLayout | typeof BaseLayout>;

export interface AppInstance {
  isLoadingShown: Ref<boolean>;
  isRouteLoaded: ComputedRef<boolean>;
  currentLayout: ComputedRef<CurrentLayout>;
  handleAnimationEnd: () => void;
  afterLeave: () => void;
}
