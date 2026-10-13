<template>
  <DesktopDashboard v-if="!isMobile" />
  <MobileDashboard v-else />
</template>
<script setup lang="ts">
// ==================== PÁGINA: Dashboard ====================
// Muestra DesktopDashboard o MobileDashboard según el ancho.
  import { ref, onMounted, onUnmounted } from "vue";
  import DesktopDashboard from "../components/desktop/DesktopDashboard.vue";
  import MobileDashboard from "../components/mobile/MobileDashboard.vue";

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