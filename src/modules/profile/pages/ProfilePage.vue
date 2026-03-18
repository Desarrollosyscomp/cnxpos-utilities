<template>
    <div class="hide-on-mobile">
        <DesktopProfile />
    </div>
    <div class="hide-on-desktop">
        <MobileProfile />
    </div>
</template>
<script setup lang="ts">
import DesktopProfile from '../components/desktop/DesktopProfile.vue';
import MobileProfile from '../components/mobile/MobileProfile.vue';
</script>