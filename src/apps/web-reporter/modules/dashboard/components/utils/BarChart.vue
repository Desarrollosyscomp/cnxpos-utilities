<template>
  <div class="chart">
    <p v-if="messageNotFound" class="message-not-found">
      {{ messageNotFound }}
    </p>
    <canvas ref="chartRef" id="bar-chart"></canvas>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, watch } from "vue";
import Chart from "chart.js/auto";
import { useAppStore } from "../../../../../../store/app.store";
import { useChartTheme } from "./graphic-helpers/ChangeOfGraphicFeatures";

const appStore = useAppStore();
const chartRef = ref(null);
let chartInstance = null;

const props = defineProps({
  labels: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
});


watch(
  () => [props.labels, props.data],
  ([labels, data]) => {
    const messageNotFound = ref("");
    if (!chartRef.value || !labels?.length || !data?.length) {
      messageNotFound.value = "No hay datos para mostrar";
      return;
    }

    if (chartInstance) {
      chartInstance.data.labels = labels;
      chartInstance.data.datasets[0].data = data;
      chartInstance.update();
    } else {
      chartInstance = new Chart(chartRef.value, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Facturado ultimos 7 dias",
              data: data,
              backgroundColor: [
                "#541811",
                "#ff4c00",
              ],
              borderColor: [
                "#541811",
                "#ff4c00",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });

      useChartTheme(() => chartInstance);
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
});
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}

.message-not-found {
  font-size: 18px;
  text-align: center;
}
</style>