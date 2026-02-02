<template>

        <MobileLoginLayout>
            <router-view />
        </MobileLoginLayout>
</template>
<script setup>
import MobileLoginLayout from '../auth/components/mobile/LoginLayout.vue';
import LoginLayout from '../auth/components/desktop/MobileLoginLayout.vue';


</script>