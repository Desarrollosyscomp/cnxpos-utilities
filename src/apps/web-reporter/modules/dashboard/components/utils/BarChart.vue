<template>
  <div class="chart">
    <canvas ref="chartRef" id="bar-chart"></canvas>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import Chart from "chart.js/auto";
import { useAppStore } from "../../../../../../store/app.store";
import { useChartTheme } from "./graphic-helpers/ChangeOfGraphicFeatures";

const appStore = useAppStore();
const chartRef = ref(null);
let chartInstance = null;
const isDark = appStore.theme.dataTheme === "dark";

onMounted(() => {
  if (!chartRef.value) return;

  chartInstance = new Chart(chartRef.value, {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
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
});


onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>
<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
