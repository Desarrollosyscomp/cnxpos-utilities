<template>
        <MobileLoginLayout>
            <router-view />
        </MobileLoginLayout>
</template>
<script setup>
import MobileLoginLayout from '../auth/components/mobile/MobileLoginLayout.vue';
import LoginLayout from '../auth/components/desktop/DesktopLoginLayout.vue';


</script>