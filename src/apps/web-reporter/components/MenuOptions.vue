<template>
  <div class="toolbar" data-tooltip="Ventas acumuladas" style="--tooltip-left: -165px;">
    <DateSalesIcon :class="isActive('range-sales')" @click="redirect('range-sales')"/>
  </div>
  <div class="toolbar" data-tooltip="Ventas diarias" style="--tooltip-left: -110px;">
    <Icon :path="mdiCurrencyUsd" :class="isActive('daily-sales')" @click="redirect('daily-sales')"/>
  </div>
  <div class="toolbar" data-tooltip="Dashboard" style="--tooltip-left: -95px; --tooltip-top: -30px;">
    <DashboardIcon :class="isActive('dashboard')" @click="redirect('dashboard')"/>
  </div>
  <div class="toolbar" data-tooltip="Arqueos" style="--tooltip-left: -75px; --tooltip-top: -30px;">
    <RegisterBoxIcon :class="isActive('registers')" @click="redirect('registers')"/>
  </div>
  <div class="toolbar" data-tooltip="CxP y CxC" style="--tooltip-left: -90px;">
    <Icon :path="mdiCreditCardSearch" :class="isActive('accounts-payable-receivable')" @click="redirect('accounts-payable-receivable')"/>
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
import {mdiCreditCardSearch, mdiCurrencyUsd} from "@mdi/js";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const isActive = (routeName: string) => {
  return route.name === routeName ? 'active-bottom-menu-icon' : '';
}

const redirect = (routeName: string) => {
  if(route.name === routeName) return;
  router.push(`/web-report-v2/${routeName}`);
}
</script>
<style scoped>

.active-bottom-menu-icon{
  fill: var(--color-accent) !important;
}

.toolbar{
  position: relative;
}
.toolbar:hover::after {
  opacity: 1;
  visibility: visible;
}
.toolbar:after{
  position: absolute;
  left: var(--tooltip-left, 150px);
  top: 0px;
  content: attr(data-tooltip);
  border-radius: 5px;
  padding: 5px;
  background-color: rgb(128, 128, 128);
  color: white;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease, visibility 0.4s ease;
}

@media (max-width: 768px) {
  .toolbar:after{
    position: absolute;
  left: -20px;
  top: var(--tooltip-top, -50px);
  content: attr(data-tooltip);
  border-radius: 5px;
  padding: 5px;
  background-color: rgb(128, 128, 128);
  color: white;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease, visibility 0.4s ease;
  }
}
</style>