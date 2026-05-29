<script setup lang="ts">
// @ts-ignore
import { onMounted, onUnmounted, ref } from 'vue';
import WebReporterLayoutDesktop from './WebReporterLayoutDesktop.vue';
// @ts-ignore
import WebReporterLayoutMobile from './WebReporterLayoutMobile.vue';

const isMobile = ref(window.innerWidth <= 768);

const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  window.addEventListener("resize", updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
});
</script>

<template>
    <WebReporterLayoutMobile v-if="isMobile"></WebReporterLayoutMobile>
    <WebReporterLayoutDesktop v-if="!isMobile"></WebReporterLayoutDesktop>
</template>