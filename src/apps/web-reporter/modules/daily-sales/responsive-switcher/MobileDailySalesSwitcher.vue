<template>
  <MobileLayout>
    <router-view />
  </MobileLayout>
</template>
<script setup>
// ==================== SWITCHER: MobileDailySalesSwitcher ====================
// Envuelve la vista en MobileLayout (VITE_TARGET=mobile).
import MobileLayout from "../../../../../layouts/MobileLayout.vue";
</script>
