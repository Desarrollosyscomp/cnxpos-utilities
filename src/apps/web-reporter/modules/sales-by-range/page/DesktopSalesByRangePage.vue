<template>
    <div class="hide-on-mobile">
        <DesktopDailySalesMain />
    </div>
    <div class="hide-on-desktop">
        <MobileDailySalesMain />
    </div>
</template>
<script setup>
import DesktopDailySalesMain from "../components/desktop/DesktopDailySalesMain.vue";
import MobileDailySalesMain from "../components/mobile/MobileDailySalesMain.vue";

</script>
<style scoped>
</style>