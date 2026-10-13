<script setup lang="ts">
// ==================== LAYOUT: InventoryLayout ====================
// Elige el layout de escritorio o móvil del inventario según el ancho (768 px).
// @ts-ignore
import { onMounted, onUnmounted, ref } from "vue";
import InventoryLayoutDesktop from "./InventoryLayoutDesktop.vue";
// @ts-ignore
import InventoryLayoutMobile from "./InventoryLayoutMobile.vue";

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
  <InventoryLayoutMobile v-if="isMobile" />
  <InventoryLayoutDesktop v-else />
</template>
