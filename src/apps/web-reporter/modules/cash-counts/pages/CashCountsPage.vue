<template>
    <DesktopCashCountsMain v-if="!isMobile" />
    <MobileCashCountsMain v-else />
</template>
<script setup lang="ts">
// ==================== PÁGINA: Arqueos de caja ====================
// Muestra la versión de escritorio o móvil según el ancho.
import { onMounted, onUnmounted, ref } from "vue";
import DesktopCashCountsMain from "../components/desktop/DesktopCashCounts.vue";
import MobileCashCountsMain from "../components/mobile/MobileCashCounts.vue";

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
