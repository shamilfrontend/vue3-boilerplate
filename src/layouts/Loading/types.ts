import type { Ref, ComponentPublicInstance } from 'vue';

import type { Nullable } from '#/types';

export interface LoadingProps {
  isLoaded: Nullable<boolean>;
}

export interface LoadingInstance {
  loader: Ref<Nullable<ComponentPublicInstance>>;
  iterationCount: Ref<number>;
}
