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
import MobileHomeLayout from "../../../../../layouts/MobileLayout.vue";
import DesktopHomeLayout from "../../../../../layouts/DesktopLayout.vue";
</script>