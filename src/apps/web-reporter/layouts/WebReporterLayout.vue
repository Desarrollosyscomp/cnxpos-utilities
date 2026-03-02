<script setup lang="ts">
// @ts-ignore
import WebReporterLayoutDesktop from './WebReporterLayoutDesktop.vue';
// @ts-ignore
import WebReporterLayoutMobile from './WebReporterLayoutMobile.vue';

</script>

<template>
  <span class="hide-on-desktop">
    SWITCHHHHH
    <WebReporterLayoutMobile></WebReporterLayoutMobile>
  </span>
  <span class="hide-on-mobile">
    <WebReporterLayoutDesktop></WebReporterLayoutDesktop>
  </span>
</template>