<template>
  <div class="chart">
    <canvas ref="chartRef" id="bar-chart"></canvas>
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
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'x',
      responsive: true,
      maintainAspectRatio: false
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
  width: 100%;
  height: 100%;
}
</style>

