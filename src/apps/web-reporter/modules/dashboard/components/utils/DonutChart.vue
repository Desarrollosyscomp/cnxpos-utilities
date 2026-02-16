<template>
  <div class="chart">
    <canvas ref="chartRef" id="donut-chart"></canvas>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Chart from 'chart.js/auto'

const chartRef = ref(null)
let chartInstance = null

onMounted(() => {
  if (!chartRef.value) return

  chartInstance = new Chart(chartRef.value, {
    type: 'doughnut',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
        hoverOffset: 4
      }]
    }
  })
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>
<style scoped>
.chart {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

