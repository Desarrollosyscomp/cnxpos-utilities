<template>
  <div class="hide-on-mobile">
    <DesktopCashCountsMain />
  </div>
  <div class="hide-on-desktop">
    <MobileCashCountsMain />
  </div>
</template>
<script setup>
import DesktopCashCountsMain from "../components/desktop/DesktopCashCounts.vue";
import MobileCashCountsMain from "../components/mobile/MobileCashCounts.vue";
</script>
<style scoped></style>
