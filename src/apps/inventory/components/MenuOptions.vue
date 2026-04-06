<template>
  <DateSalesIcon :class="isActive('range-sales')" @click="redirect('range-sales')"/>
  <Icon :path="mdiCurrencyUsd" :class="isActive('daily-sales')" @click="redirect('daily-sales')"/>
  <DashboardIcon :class="isActive('dashboard')" @click="redirect('dashboard')"/>
  <RegisterBoxIcon :class="isActive('registers')" @click="redirect('registers')"/>
  <Icon :path="mdiCreditCardSearch" :class="isActive('accounts-payable-receivable')" @click="redirect('accounts-payable-receivable')"/>
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
import { mdiCreditCardSearch, mdiCurrencyUsd} from "@mdi/js";
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

</style>