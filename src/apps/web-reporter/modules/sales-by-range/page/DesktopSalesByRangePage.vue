<template>
  <DesktopRangeSalesMain v-if="!isMobile" />
  <MobileRangeSalesMain v-else />
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import DesktopRangeSalesMain from "../components/desktop/DesktopRangeSalesMain.vue";
import MobileRangeSalesMain from "../components/mobile/MobileRangeSalesMain.vue";
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
