<template>
    <div class="hide-on-desktop">
        <MobileLayout>
            <router-view />
        </MobileLayout>
    </div>
    <div class="hide-on-mobile">
        <DesktopLayout>
            <router-view />
        </DesktopLayout>
    </div>
</template>
<script setup>
// import DesktopHomeLayout from '../home/components/desktop/DesktopHomeLayout.vue';
// import MobileHomeLayout from '../home/components/mobile/MobileHomeLayout.vue';
import DesktopLayout from '../../layouts/DesktopLayout.vue';
import MobileLayout from '../../layouts/MobileLayout.vue';



</script>