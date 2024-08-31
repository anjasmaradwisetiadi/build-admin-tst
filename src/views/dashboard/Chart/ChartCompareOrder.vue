<template>
  <div class="relative min-w-[800px]">
    <div class="w-full flex justify-center">
      <h2 class="text-2xl pb-24 text-center font-semibold">
          Comparassion Tahunan
      </h2>
    </div>
    <div class="w-full pt-2  min-h-[10rem]">
      <div class="relative" v-if="getLoading">
        <div
            id="modal-bg" class="w-full h-full z-40 absolute top-0 absolute blur-background">
        </div>
        <div 
            class="w-full h-[10rem] flex flex-col items-center gap-2 -translate-y-1/2 p-6 top-1/2 left-1/2 -translate-x-1/2 absolute z-20">
            <img src="@/assets/icon/spinner.svg" alt="spinner">
        </div>
      </div>
      <div v-if="!getLoading">
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]"  />
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, reactive, computed} from "vue";
import Chart from 'primevue/chart';
import {summaryMonthlyOrder, summaryOrderComparison, summaryYearlyOrder} from "@/utilize/DataDummy.js";
import { useSummaryStore } from "@/stores/SummaryStore";

const summaryStore = useSummaryStore()

onMounted(() => {
  chartOptions.value = setChartOptions();
  // ******** trigger
  // summaryStore.orderComparison()
});

const getLoading = computed(()=>{
  return summaryStore.loadingOrderComparison
})

const getError = computed(()=>{
  return summaryStore.orderComparisonResponseError
})

const getResponse = computed(()=>{
  return summaryStore.orderComparisonResponseError
})

//todo from API
const chartDataRaw = reactive(summaryOrderComparison);
const chartOptions = ref();

const chartData = computed(() => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: [`Perubahan Penjualan ${chartDataRaw.percentage}%`],
    datasets: [
      {
        label: `Penjualan ${chartDataRaw.previous.month}`,
        backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
        data: [chartDataRaw.previous.amount]
      },
      {
        label: `Penjualan ${chartDataRaw.current.month}`,
        backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
        borderColor: documentStyle.getPropertyValue('--p-gray-500'),
        data: [chartDataRaw.current.amount]
      }
    ]
  };
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


<style scoped>

</style>