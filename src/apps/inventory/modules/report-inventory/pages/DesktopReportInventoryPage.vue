<template>
  <ReportInventoryDesktopMain v-if="!isMobile" />
  <ReportInventoryMobileMain v-else />
</template>
<script setup lang="ts">
// ==================== PÁGINA: Inventario ====================
// Muestra la versión de escritorio o móvil según el ancho.
import { ref, onMounted, onUnmounted } from "vue";
import ReportInventoryDesktopMain from "../components/desktop/ReportInventoryDesktopMain.vue";
import ReportInventoryMobileMain from "../components/mobile/ReportInventoryMobileMain.vue";

const isMobile = ref(window.innerWidth <= 768);

// -------------------- Recalcula si la ventana es móvil (768 px) --------------------
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
<style scoped></style>
