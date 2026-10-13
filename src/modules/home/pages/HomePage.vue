<template>
    <div class="hide-on-mobile">
        <DesktopHome />
    </div>
    <div class="hide-on-desktop">
        <MobileHome />
    </div>
</template>
<script setup>
// ==================== PÁGINA: Home ====================
// Muestra DesktopHome o MobileHome según el ancho.
import DesktopHome from '../components/desktop/DesktopHome.vue';
import MobileHome from '../components/mobile/MobileHome.vue';
</script>