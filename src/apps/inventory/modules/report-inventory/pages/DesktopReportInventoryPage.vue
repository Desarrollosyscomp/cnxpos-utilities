<template>
  <ReportInventoryDesktopMain v-if="!isMobile" />
  <ReportInventoryMobileMain v-else />
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import ReportInventoryDesktopMain from "../components/desktop/ReportInventoryDesktopMain.vue";
import ReportInventoryMobileMain from "../components/mobile/ReportInventoryMobileMain.vue";

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
<style scoped></style>
