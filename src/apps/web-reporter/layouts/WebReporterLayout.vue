<script setup lang="ts">
// ==================== LAYOUT: WebReporterLayout ====================
// Elige el layout de escritorio o móvil del web reporter según el ancho (768 px).
// @ts-ignore
import { onMounted, onUnmounted, ref } from 'vue';
import WebReporterLayoutDesktop from './WebReporterLayoutDesktop.vue';
// @ts-ignore
import WebReporterLayoutMobile from './WebReporterLayoutMobile.vue';

const isMobile = ref(window.innerWidth <= 768);

// -------------------- Recalcula si la ventana es móvil --------------------
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