<template>
    <div class="hide-on-mobile">
        <DesktopDailySalesMain />
    </div>
    <div class="hide-on-desktop">
        <MobileDailySalesMain />
    </div>
</template>
<script setup>
// ==================== PÁGINA: Ventas del día ====================
// Muestra la versión de escritorio o móvil por CSS.
import DesktopDailySalesMain from "../components/desktop/DesktopDailySalesMain.vue";
import MobileDailySalesMain from "../components/mobile/MobileDailySalesMain.vue";

</script>
<style scoped>
</style>