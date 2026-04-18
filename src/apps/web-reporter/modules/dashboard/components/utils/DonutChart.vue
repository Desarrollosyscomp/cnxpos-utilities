<template>
  <div class="card">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from "vue";
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

// 👇 Watch reactivo
watch(
  () => [props.labels, props.data, appStore.theme.dataTheme],
  () => {
    if (!chartRef.value || !props.labels.length || !props.data.length) return;

    const textColor =
      appStore.theme.dataTheme === "dark" ? "#ffffff" : "#000000";

    if (chartInstance) {
      // 🔄 actualizar
      chartInstance.data.labels = props.labels;
      chartInstance.data.datasets[0].data = props.data;
      chartInstance.options.plugins.legend.labels.color = textColor;
      chartInstance.update();
    } else {
      // 🆕 crear
      chartInstance = new Chart(chartRef.value, {
        type: "doughnut",
        data: {
          labels: props.labels,
          datasets: [
            {
              data: props.data,
              backgroundColor: [
                "#541811",
                "#ff4c00",
                "#c5351b",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                usePointStyle: true,
                pointStyle: "rect",
                color: textColor,
              },
            },
          },
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
.card {
  width: 100%;
  display: flex;
  justify-content: center;
}
@media (min-width: 360px) {
  @media (min-height: 800px) {
    .card {
      height: 25vh;
    }
  }
}
</style>