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
import MobileLayout from "../../../../../layouts/MobileLayout.vue";
import DesktopLayout from "../../../../../layouts/DesktopLayout.vue";
</script>