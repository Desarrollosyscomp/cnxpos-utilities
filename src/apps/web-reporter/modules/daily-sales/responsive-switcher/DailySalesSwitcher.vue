<template>
    <div class="hide-on-desktop">
        <WebReporterLayoutMobile>
            <router-view />
        </WebReporterLayoutMobile>
    </div>
    <div class="hide-on-mobile">
        <WebReporterLayout>
            <router-view />
        </WebReporterLayout>
    </div>
</template>
<script setup>
import WebReporterLayoutMobile from "../../../layouts/WebReporterLayoutMobile.vue";
import WebReporterLayout from "../../../layouts/WebReporterLayoutDesktop.vue";
</script>