<template>
  <div class="chart">
    <canvas ref="chartRef" id="bar-line-chart"></canvas>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from "vue";
import Chart from "chart.js/auto";
import { useChartTheme } from "./graphic-helpers/ChangeOfGraphicFeatures";

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

// 👇 Watch reactivo
watch(
  () => [props.labels, props.data],
  ([labels, data]) => {
    if (!chartRef.value || !labels?.length || !data?.length) return;

    if (chartInstance) {
      // 🔄 actualizar
      chartInstance.data.labels = labels;
      chartInstance.data.datasets[0].data = data;
      chartInstance.update();
    } else {
      // 🆕 crear
      chartInstance = new Chart(chartRef.value, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Facturado ultimos 7 dias",
              data: data,
              borderWidth: 1,
              backgroundColor: "#ff4c00",
            },
          ],
        },
        options: {
          indexAxis: "y",
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
</style>