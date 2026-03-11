<template>
    <div class="hide-on-mobile">
        <ReportInventoryDesktopMain />
    </div>
    <div class="hide-on-desktop">
        <ReportInventoryMobileMain />
    </div>
</template>
<script setup lang="ts">
import ReportInventoryDesktopMain from "../components/desktop/ReportInventoryDesktopMain.vue";
import ReportInventoryMobileMain from "../components/mobile/ReportInventoryMobileMain.vue";

</script>
<style scoped>
</style>