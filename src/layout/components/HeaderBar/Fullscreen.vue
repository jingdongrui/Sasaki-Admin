<script lang="ts" setup>
import { useFullscreen } from "@vueuse/core";
const { toggle, isFullscreen } = useFullscreen();
</script>
<template>
  <div class="fullscreen">
    <SvgIcon
      :name="isFullscreen ? 'ssk-fullscreen-exit' : 'ssk-fullscreen'"
      size="20"
      @click="toggle"
    />
  </div>
  <!-- ssk-fullscreen-exit -->
  <!-- ssk-fullscreen -->
</template>
