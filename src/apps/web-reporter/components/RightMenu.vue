<template>
    <div class="right-menu">

        <div class="right-menu-box">
            <DashboardIcon :class="['icon','clickable', route.name === 'dashboard' ? 'active-icon' : '']" @click="route.name === 'dashboard' ? '' : router.push('/web-report-v2/dashboard')"/>
            <Icon :path="mdiCurrencyUsd" :class="['icon','clickable', route.name === 'daily-sales' ? 'active-icon' : '']" @click="route.name === 'daily-sales' ? '' : router.push('/web-report-v2/daily-sales')"/>
            <RegisterBoxIcon :class="['icon','clickable', route.name === 'registers' ? 'active-icon' : '']" @click="route.name === 'registers' ? '' : router.push('/web-report-v2/registers')"/>
            <DateSalesIcon :class="['icon','clickable', route.name === 'date-sales' ? 'active-icon' : '']" @click="route.name === 'date-sales' ? '' : router.push('/web-report-v2/date-sales')"/>
        </div>
    </div>
</template>
<script setup lang="ts">
// @ts-ignore
import DashboardIcon from "../../../assets/general/icons/DashboardIcon.vue";
// @ts-ignore
import RegisterBoxIcon from "../../../assets/general/icons/RegisterBoxIcon.vue";
// @ts-ignore
import DateSalesIcon from "../../../assets/general/icons/DateSales.vue";
// @ts-ignore
import Icon from "../../../components/Icon.vue";
import {mdiCurrencyUsd} from "@mdi/js";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

console.log(route.name)

</script>
<style scoped>

:global(:root){
    --right-menu-box-proportion: 1;
}
.right-menu{
    position:absolute;
    bottom: 0;
    height: 100%;
    right:0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.right-menu-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--color-primary-dark-2);
    padding: calc(var(--right-menu-box-proportion) * 3px);
    padding-left: calc(var(--right-menu-box-proportion) * 7px);
    padding-top: calc(var(--right-menu-box-proportion) * 40px);
    padding-bottom: calc(var(--right-menu-box-proportion) * 40px);
    border-radius: calc(var(--right-menu-box-proportion) * 15px) 0 0 calc(var(--right-menu-box-proportion) * 15px);
    gap: calc(var(--right-menu-box-proportion) * 15px);

}

.icon{
    fill: var(--color-contrast);
    width: calc(var(--right-menu-box-proportion) * 40px);
    height: calc(var(--right-menu-box-proportion) * 40px);
    transition: 0.4s ease;
    position:relative;
}
.icon:hover{
    width: calc(var(--right-menu-box-proportion) * 60px);
    height: calc(var(--right-menu-box-proportion) * 60px);
    transition: 0.3s ease;
}

.active-icon{
    fill: var(--color-cnx-orange);
}

@media (min-width: 1920px){
    :global(:root){
        --right-menu-box-proportion: 1.4;
    }
}
@media (min-width: 2560px){
    :global(:root){
        --right-menu-box-proportion: 1.7;
    }
}
</style>