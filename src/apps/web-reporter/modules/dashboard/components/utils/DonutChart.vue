<template>
  <div class="card">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Chart from "chart.js/auto";
import { useLocalStorage } from "@vueuse/core";

const chartRef = ref(null);
let chartInstance = null;

onMounted(() => {
  if (!chartRef.value) return;

  chartInstance = new Chart(chartRef.value, {
    type: "doughnut",
    data: {
      labels: ["1", "una metrica", "metrica 3"],
      datasets: [
        {
          data: [20, 60, 20],
          backgroundColor: [
            "#F4B400", // amarillo
            "#FF5C8D", // rosado
            "#4285F4", // azul
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
            color: themeValue.value.themeLight ? "#ffffff" : "#000000",
          },
        },
      },
    },
  });
});
let themeDark = ref(true);
let themeLight = ref(false);
const themeValue = useLocalStorage("theme", { themeLight: false, themeDark: true });
if (themeValue.value.themeLight == true) {
  themeLight.value = true;
  themeDark.value = false;
} else {
  themeDark.value = true;
  themeLight.value = false;
}

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>

<style scoped>
.card {
  width: 100%;
  height: 30vh;
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
