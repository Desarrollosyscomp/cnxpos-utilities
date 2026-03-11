<script setup lang="ts">
// @ts-ignore
import InventoryLayoutDesktop from './InventoryLayoutDesktop.vue';
// @ts-ignore
import InventoryLayoutMobile from './InventoryLayoutMobile.vue';

</script>

<template>
  <span class="hide-on-desktop">
    <InventoryLayoutMobile></InventoryLayoutMobile>
  </span>
  <span class="hide-on-mobile">
    <InventoryLayoutDesktop></InventoryLayoutDesktop>
  </span>
</template>