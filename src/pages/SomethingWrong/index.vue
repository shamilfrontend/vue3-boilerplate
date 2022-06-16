<template>
  <div class="error-page">
    <div class="error-page__inner">
      <img
        :src="imageSrc"
        :alt="titleText"
        class="error-page__img"
      />
      <div class="error-page__title">{{ titleText }}</div>
      <router-link :to="{ name: R_HOME }">
        <q-button>Перейти на главную</q-button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import type { PropType } from 'vue';

import imageError403 from '@/assets/error-403.svg';
import imageError404 from '@/assets/error-404.svg';
import { RouteName } from '@/constants';
import { validateArray } from '@/helpers/validateArray';

import type {
  SomethingWrongPropCode,
  SomethingWrongProps,
  SomethingWrongInstance
} from './types';

export default defineComponent({
  name: 'SomethingWrongPage',

  props: {
    code: {
      type: Number as PropType<SomethingWrongPropCode>,
      default: 404,
      validator: validateArray<SomethingWrongPropCode>([403, 404])
    }
  },

  setup(props: SomethingWrongProps): SomethingWrongInstance {
    const imageSrc = computed<string>(() => {
      switch (props.code) {
        case 403:
          return imageError403;

        case 404:
        default:
          return imageError404;
      }
    });

    const titleText = computed<string>(() => {
      switch (props.code) {
        case 403:
          return 'Раздел недоступен';

        case 404:
        default:
          return 'Страница не найдена';
      }
    });

    return {
      R_HOME: RouteName.HOME,
      imageSrc,
      titleText
    };
  }
});
</script>

<style
  lang="scss"
  scoped
>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;

  &__img {
    width: 240px;
    height: 240px;
    background: radial-gradient(
      circle,
      var(--color-tertiary-white) 114px,
      transparent 114px
    );
  }

  &__title {
    margin-top: 32px;
    margin-bottom: 32px;
    font-size: 24px;
    font-weight: 800;
    line-height: 31px;
    color: var(--color-primary-black);
  }
}
</style>
