<template>
  <div class="app-background"></div>
  <div class="dashboard-container">
    <div class="items-dashboard">
      <div class="container">
        <div class="beto-message-container">
          <img
            class="beto-avatar"
            src="../../../../../../assets/avatars/beto.svg"
          />
          <div class="bubble bubble-a bubble-left">
            <span>Bienvenido al</span>
            <h3 class="web-reporter-title">Web <br />Reporter</h3>
            <span
              >Aquí encontrarás <br />
              un resumen de tu negocio</span
            >
          </div>
        </div>
        <div class="item">
          <div class="text">
            <span>Facturado Hoy</span>
            <span class="subtitle">Total</span>
          </div>
          <div class="value">
            <span>{{
              numberToCurrency(summaryDashboard?.salesDay?.totalSales)
            }}</span>
          </div>
        </div>
        <div class="item">
          <div class="text">
            <span>Cuentas por pagar</span>
            <span class="subtitle">Total</span>
          </div>
          <div class="value">
            <span>{{
              numberToCurrency(summaryDashboard?.payablePortfolio?.pendingPaid)
            }}</span>
          </div>
        </div>
        <div class="item">
          <div class="text">
            <span>Cuentas por cobrar</span>
            <span class="subtitle">Total</span>
          </div>
          <div class="value">
            <span>{{
              numberToCurrency(
                summaryDashboard?.receivablePortfolio?.pendingPaid
              )
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="charts-container">
      <div class="bar-charts">
        <div class="item-chart">
          <BarChart :labels="dates || [1,2,3]" :data="values || [1,2,3]" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import BarChart from "../utils/BarChart.vue";
import { useDashboardStore } from "../../store/dashboard.store";
import { onMounted, ref } from "vue";
import { numberToCurrency } from "../../../../../../utils/parsers/number-currency";
import { useAppStore } from "../../../../../../store/app.store";
const dashboardStore = useDashboardStore();
const appStore = useAppStore();

const formDates = ref({
  init_date: new Date().toISOString().split("T")[0],
  end_date: new Date().toISOString().split("T")[0],
});

const summaryDashboard = ref({} as any);
const cumulativeSales = ref([] as any);
const dates = ref([] as any);
const values = ref([] as any);
const setDashboardSummary = async () => {
  const parsedInitDate = formDates.value.init_date?.replace(/-/g, "");
  const parsedEndDate = formDates.value.end_date?.replace(/-/g, "");
  if (!parsedInitDate || !parsedEndDate) return;
  const response = await dashboardStore.getDashboardSummary(
    parsedInitDate,
    parsedEndDate
  );
  summaryDashboard.value = response.data;
  cumulativeSales.value = response.data.cumulativeSales;
  extractDatesOfCumulativeSales();
  extractValuesOfCumulativeSales();
};
const extractDatesOfCumulativeSales = async () => {
  dates.value = cumulativeSales.value.map((item: any) => {
    const date = item.date.toString();
    const formatted = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(
      6,
      8
    )}`;
    return formatted;
  });
};
const extractValuesOfCumulativeSales = () => {
  values.value = cumulativeSales.value.map((item: any) => item.totalSales);
};

onMounted(async () => {
  appStore.afterLoading(setDashboardSummary);
});
</script>
<style scoped>
@import "../../../../../../utils/css/dialog-bubble.css";
@import "../../../../../../styles/backgrounds.css";

:global(:root) {
  --padding-proportion: 1;
}

.dashboard-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
}
.items-dashboard {
  display: flex;
  justify-content: center;
}

.item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  padding-bottom: 15px;
  width: 15%;
  height: 12vh;
  border-radius: 10px;
  border: 1px solid var(--color-contrast);
  background-color: var(--color-primary-light);
  color: var(--color-contrast);
  font-size: calc(20px * var(--item-font-size));
  font-weight: 600;
}

.item:nth-child(1) {
  background-color: var(--color-contrast);
  color: var(--color-primary);
}

.text {
  display: flex;
  flex-direction: column;
}

.subtitle {
  font-size: calc(14px * var(--item-subtitle-font-size));
  font-weight: 500;
}

.value {
  display: flex;
  justify-content: end;
  font-size: calc(20px * var(--item-value-font-size));
}

.beto-message-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
}

.beto-avatar {
  width: 10vw;
}

.bubble-a.bubble {
  --line-height-proportion: 1;
  --font-size-proportion: 1;
  --border: 1px;
  --border-color: var(--color-contrast);
  --background: var(--color-primary-light);
  --triangle-size: 1;
  --triangle-y: 60px;

  color: var(--color-contrast);
  font-size: calc(12px * var(--font-size-proportion));

  line-height: calc(24px * var(--line-height-proportion));
  text-align: center;
}

.bubble > :nth-child(1) {
  font-weight: medium;
  font-size: calc(13px * var(--font-size-proportion));
}

.web-reporter-title {
  font-size: calc(20px * var(--item-title-font-size));
  margin-bottom: calc(5px * var(--margin-title-bottom));
}

.charts-container {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.bar-charts {
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.item-chart {
  padding: 20px;
  height: 18vh;
  border-radius: 10px;
  border: 1px solid #2f1310;
  background-color: var(--color-primary-light);
  color: var(--color-contrast) !important;
  font-size: calc(13px * var(--item-font-size));
  font-weight: 600;

  [data-theme="dark"] & {
    border-color: transparent;
    color: white;
  }
}

.donut-chart {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px 25px;
  width: 15%;
  height: 41vh;
  border-radius: 10px;
  border: 1px solid #2f1310;
  background-color: var(--color-primary-light);
  color: var(--color-contrast);
  font-size: calc(13px * var(--item-font-size));
  font-weight: 600;

  [data-theme="dark"] & {
    border-color: transparent;
    color: white;
  }
}

.text-class {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
}

@media (min-width: 1024px) {
  @media (min-height: 1366px) {
    .container {
      padding: 50px;
    }
    .item-chart {
      height: 16vh;
    }
  }
}

@media (min-width: 1920px) {
  .item {
    width: 15%;
    height: 13vh;
    padding: 25px;
  }
  .text {
    font-size: 30px;
  }
  .subtitle {
    font-size: 25px;
  }
  .value {
    font-size: 30px;
  }
  .item-chart {
    height: 18vh;
  }
  .bar-charts {
    gap: 30px;
  }
  .donut-chart {
    height: 43.5vh;
  }
  .beto-avatar {
    width: 210px;
  }

  .bubble-a.bubble {
    --line-height-proportion: 2;
    --font-size-proportion: 1.5;
    --triangle-size: 3;
    --triangle-y: 90px;
  }

  .bubble > :nth-child(1) {
    --font-size-proportion: 2;
  }

  .web-reporter-title {
    --item-title-font-size: 2;
  }
}

@media (min-width: 2560px) {
  .beto-message-container {
    gap: 35px;
  }
  .beto-avatar {
    width: 10vw;
  }
  .bubble-a.bubble {
    --line-height-proportion: 2;
    --font-size-proportion: 2;
    padding: 20px;
  }
  .item-chart {
    height: 20vh;
  }
  .bar-charts {
    gap: 30px;
  }
  .donut-chart {
    height: 45.5vh;
  }
}
</style>
