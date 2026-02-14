<template>
    <div class="hide-on-mobile">
        <DesktopDashboard />
    </div>
    <div class="hide-on-desktop">
        <MobileDashboard />
    </div>
</template>
<script setup>
import DesktopDashboard from '../components/desktop/DesktopDashboard.vue';
import MobileDashboard from '../components/mobile/MobileDashboard.vue';
</script>