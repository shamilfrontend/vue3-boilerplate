<template>
  <div class="base-layout">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LayoutBase'
});
</script>

<style
  lang="scss"
  scoped
>
.base-layout {
  // styles
}
</style>
