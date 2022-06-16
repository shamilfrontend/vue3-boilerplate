<template>
  <transition
    name="component-fade"
    :duration="{ enter: 0, leave: 500 }"
    @after-leave="afterLeave"
  >
    <loading-layout
      v-if="isLoadingShown"
      key="loading-layout"
      :is-loaded="isRouteLoaded"
      @animation-end="handleAnimationEnd"
    />
  </transition>

  <component
    :is="currentLayout"
    key="dynamic-layout"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRoute } from 'vue-router';

import BaseLayout from '@/layouts/Base';
import EmptyLayout from '@/layouts/Empty';
import LoadingLayout from '@/layouts/Loading';
import { useProfileStore } from '@/store';

import type { CurrentLayout, AppInstance } from './types';

export default defineComponent({
  name: 'App',

  components: {
    LoadingLayout
  },

  setup(): AppInstance {
    const profile = useProfileStore();
    const route = useRoute();

    const isLoadingShown = ref<boolean>(true);

    const isRouteLoaded = computed<boolean>(() => Boolean(route.name));

    const currentLayout = computed<CurrentLayout>(() => {
      if (!isRouteLoaded.value) return null;

      switch (route.meta.layout) {
        case 'dynamic':
          return profile.isUserExist ? BaseLayout : EmptyLayout;

        case 'empty':
          return EmptyLayout;

        default:
          return BaseLayout;
      }
    });

    document.documentElement.classList.add('is-loading');

    const afterLeave = (): void => {
      document.documentElement.classList.remove('is-loading');
      document.documentElement.classList.add('is-loaded');
    };

    const handleAnimationEnd = (): void => {
      isLoadingShown.value = false;
    };

    return {
      isLoadingShown,
      isRouteLoaded,
      currentLayout,
      handleAnimationEnd,
      afterLeave
    };
  }
});
</script>

<style
  lang="scss"
  scoped
>
.component-fade {
  &-leave {
    &-active {
      transition: opacity 1s ease;
    }

    &-to {
      opacity: 0;
    }
  }
}
</style>

<style lang="scss">
:root {
  --color-primary: var(--color-primary-blue);
  --color-rgb-primary: 65 98 240;
  --gradient-primary: linear-gradient(
    225deg,
    var(--color-primary-blue) 0%,
    var(--color-primary-blue-aqua) 100%
  );
}

* {
  box-sizing: border-box;
}

html {
  &.is-loading {
    overflow: hidden;
  }

  body {
    font-family: Gilroy, sans-serif;
  }
}

button {
  cursor: pointer;
}

@font-face {
  font-family: Gilroy;
  font-style: normal;
  font-weight: 800;
  src: local('Gilroy ExtraBold'), local('Gilroy-ExtraBold'),
    url('/static/fonts/Gilroy-ExtraBold.woff?29042020') format('woff');
  font-display: swap;
}

@font-face {
  font-family: Gilroy;
  font-style: normal;
  font-weight: 600;
  src: local('Gilroy Bold'), local('Gilroy-Bold'),
    url('/static/fonts/Gilroy-Bold.woff?29042020') format('woff');
  font-display: swap;
}

@font-face {
  font-family: Gilroy;
  font-style: normal;
  font-weight: 500;
  src: local('Gilroy Medium'), local('Gilroy-Medium'),
    url('/static/fonts/Gilroy-Medium.woff?29042020') format('woff');
  font-display: swap;
}

@font-face {
  font-family: Gilroy;
  font-style: normal;
  font-weight: 400;
  src: local('Gilroy Regular'), local('Gilroy-Regular'),
    url('/static/fonts/Gilroy-Regular.woff?29042020') format('woff');
  font-display: swap;
}
</style>
