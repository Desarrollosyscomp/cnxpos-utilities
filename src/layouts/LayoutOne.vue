<script setup lang="ts">
// ==================== LAYOUT: LayoutOne ====================
// Elige DesktopLayout o MobileLayout por CSS (hide-on-mobile / hide-on-desktop).
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