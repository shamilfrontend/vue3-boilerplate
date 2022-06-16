<template>
  <div class="loading">
    <big-loader
      ref="loader"
      class="loading__image"
      :style="{ 'animation-iteration-count': iterationCount }"
      width="72px"
      height="72px"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { ComponentPublicInstance } from 'vue';

import BigLoader from '@/components/icons/BigLoader';

import type { Nullable } from '#/types';

import type { LoadingProps, LoadingInstance } from './types';

const ANIMATION_END_EVENT = 'animation-end';
const ANIMATION_TIME_IN_MS = 1790;

export default defineComponent({
  name: 'LayoutLoading',

  components: {
    BigLoader
  },

  props: {
    isLoaded: {
      type: Boolean,
      default: false
    }
  },

  emits: [ANIMATION_END_EVENT],

  setup(props: LoadingProps, ctx): LoadingInstance {
    let timer: Nullable<ReturnType<typeof setInterval>> = null;
    const iterationCount = ref<number>(1);
    const loader = ref<Nullable<ComponentPublicInstance>>(null);

    if (props.isLoaded) {
      timer = setInterval(() => {
        iterationCount.value += 1;
      }, ANIMATION_TIME_IN_MS);
    }

    watch(
      () => props.isLoaded,
      value => {
        if (value && timer !== null) clearInterval(timer);
      },
      { immediate: true }
    );

    const handleAnimationEndEvent = (): void => {
      ctx.emit(ANIMATION_END_EVENT);
    };

    onMounted(() => {
      loader.value?.$el.addEventListener(
        'animationend',
        handleAnimationEndEvent
      );
    });

    onBeforeUnmount(() => {
      if (timer !== null) clearInterval(timer);

      loader.value?.$el.removeEventListener(
        'animationend',
        handleAnimationEndEvent
      );
    });

    return {
      loader,
      iterationCount
    };
  }
});
</script>

<style lang="scss">
.loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-tertiary-gray-lighter);

  &__image {
    transform: rotateZ(-90deg);
    animation: image-rotating 1.8s cubic-bezier(0.25, 0.1, 0.25, 1);
  }
}

@keyframes image-rotating {
  0% {
    transform: rotateZ(-90deg);
  }

  100% {
    transform: rotateZ(630deg);
  }
}
</style>
