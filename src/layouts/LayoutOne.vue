<script setup lang="ts">
import DesktopLayout from './DesktopLayout.vue';
import MobileLayout from './MobileLayout.vue';

</script>

<template>
  <span class="hide-on-desktop">
    <MobileLayout></MobileLayout>
  </span>
  <span class="hide-on-mobile">
    <DesktopLayout></DesktopLayout>
  </span>
</template>