<script setup>
import {ref, onMounted, reactive, computed} from "vue";
import Chart from 'primevue/chart';
import {summaryMonthlyOrder, summaryYearlyOrder} from "@/utilize/DataDummy.js";

onMounted(() => {
  chartOptions.value = setChartOptions();
});

//todo from API
const chartDataRaw = reactive(summaryYearlyOrder);
const chartOptions = ref();

const chartData = computed(() => {
  const labels = [];
  const data = [];
  for (let chartDataRawElement of chartDataRaw) {
    labels.push(chartDataRawElement.year)
    data.push(chartDataRawElement.amount)
  }

  return {
    labels: labels,
    datasets: [
      {
        label: "Penjualan Tahunan",
        data: data
      }
    ],
  }
})

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--p-text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 500
          }
        },
        grid: {
          display: false,
          drawBorder: false
        }
      },
      y: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false
        }
      }
    }
  };
}
</script>

<template>
  <Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]"  />
</template>

<style scoped>

</style>