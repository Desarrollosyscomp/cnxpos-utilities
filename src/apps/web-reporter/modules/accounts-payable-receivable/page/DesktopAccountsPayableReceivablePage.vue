<template>
    <div class="hide-on-mobile">
        <DesktopAccountsPayableReceivableMain />
    </div>
    <div class="hide-on-desktop">
        <MobileAccountsPayableReceivableMain />
    </div>
</template>
<script setup>
import DesktopAccountsPayableReceivableMain from "../components/desktop/DesktopAccountsPayableReceivableMain.vue";
import MobileAccountsPayableReceivableMain from "../components/mobile/MobileAccountsPayableReceivable.vue";

</script>
<style scoped>
</style>