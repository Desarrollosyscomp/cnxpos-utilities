<template>
    <DesktopAccountsPayableReceivableMain v-if="!isMobile"/>
    <MobileAccountsPayableReceivableMain v-else/>
</template>
<script setup lang="ts">
import DesktopAccountsPayableReceivableMain from "../components/desktop/DesktopAccountsPayableReceivableMain.vue";
import MobileAccountsPayableReceivableMain from "../components/mobile/MobileAccountsPayableReceivable.vue";
import { onMounted, onUnmounted, ref } from "vue";

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
<style scoped>
</style>