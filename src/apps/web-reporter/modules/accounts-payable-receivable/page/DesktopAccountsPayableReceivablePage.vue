<template>
    <DesktopAccountsPayableReceivableMain v-if="!isMobile"/>
    <MobileAccountsPayableReceivableMain v-else/>
</template>
<script setup lang="ts">
// ==================== PÁGINA: Cartera ====================
// Muestra la versión de escritorio o móvil según el ancho.
import DesktopAccountsPayableReceivableMain from "../components/desktop/DesktopAccountsPayableReceivableMain.vue";
import MobileAccountsPayableReceivableMain from "../components/mobile/MobileAccountsPayableReceivable.vue";
import { onMounted, onUnmounted, ref } from "vue";

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
<style scoped>
</style>