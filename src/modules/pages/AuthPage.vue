<template>
    <div class="hide-on-desktop">
        <MobileLoginLayout>
            <router-view />
        </MobileLoginLayout>
    </div>
    <div class="hide-on-mobile">
        <LoginLayout>
            <router-view />
        </LoginLayout>
    </div>
</template>
<script setup>
import MobileLoginLayout from '../auth/components/mobile/MobileLoginLayout.vue';
import LoginLayout from '../auth/components/desktop/DesktopLoginLayout.vue';


</script>