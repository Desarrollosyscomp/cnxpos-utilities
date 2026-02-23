<template>
    <div class="hide-on-desktop">
        <MobileHomeLayout>
            <router-view />
        </MobileHomeLayout>
    </div>
    <div class="hide-on-mobile">
        <DesktopLayoutOne>
            <router-view />
        </DesktopLayoutOne>
    </div>
</template>
<script setup>
import MobileHomeLayout from "../../../../../layouts/MobileLayout.vue";
import DesktopLayoutOne from "../../../../../layouts/DesktopLayout.vue";
</script>