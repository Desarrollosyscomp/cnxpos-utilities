<template>
    <div class="hide-on-mobile">
        <DesktopRangeSalesMain />
    </div>
    <div class="hide-on-desktop">
        <MobileRangeSalesMain />
    </div>
</template>
<script setup>
import DesktopRangeSalesMain from "../components/desktop/DesktopRangeSalesMain.vue";
import MobileRangeSalesMain from "../components/mobile/MobileRangeSalesMain.vue";

</script>
<style scoped>
</style>