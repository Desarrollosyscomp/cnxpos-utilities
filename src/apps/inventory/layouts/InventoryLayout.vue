<script setup lang="ts">
// @ts-ignore
import { onMounted, onUnmounted, ref } from "vue";
import InventoryLayoutDesktop from "./InventoryLayoutDesktop.vue";
// @ts-ignore
import InventoryLayoutMobile from "./InventoryLayoutMobile.vue";

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
  <InventoryLayoutMobile v-if="isMobile" />
  <InventoryLayoutDesktop v-else />
</template>
