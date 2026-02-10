<template>
    <div class="hide-on-mobile">
        <DesktopHome />
    </div>
    <div class="hide-on-desktop">
        <MobileHome />
    </div>
</template>
<script setup>
import DesktopHome from '../components/desktop/DesktopHome.vue';
import MobileHome from '../components/mobile/MobileHome.vue';
</script>