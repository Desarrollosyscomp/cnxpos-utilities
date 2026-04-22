<template>
  <div class="chart">
    <p v-if="messageNotFound" class="message-not-found">
      {{ messageNotFound }}
    </p>
    <!-- <div v-if="messageNotFound" class="not-found">
      <img :src="NotFound" alt="" />
    </div> -->
    <canvas v-else ref="chartRef" id="bar-line-chart"></canvas>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from "vue";
import Chart from "chart.js/auto";
import { useChartTheme } from "./graphic-helpers/ChangeOfGraphicFeatures";
import NotFound from "../../../../../../assets/general/notFound.svg";

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
    const messageNotFound = ref("");
    if (!chartRef.value || !labels?.length || !data?.length)
      return (messageNotFound.value = "No hay datos para mostrar");

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

.message-not-found {
  text-align: center;
}
/* 
.not-found {
  width: 80%;
} */
</style>
