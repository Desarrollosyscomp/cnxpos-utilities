<template>
    <div class="hide-on-desktop">
        <MobileHomeLayout>
            <router-view />
        </MobileHomeLayout>
    </div>
    <div class="hide-on-mobile">
        <DesktopHomeLayout>
            <router-view />
        </DesktopHomeLayout>
    </div>
</template>
<script setup>
import DesktopHomeLayout from '../home/components/desktop/DesktopHomeLayout.vue';
import MobileHomeLayout from '../home/components/mobile/MobileHomeLayout.vue';


</script>