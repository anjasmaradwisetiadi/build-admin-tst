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
      <div class="relative" v-if="!getLoading && getError">
        <div 
            class="w-full h-[10rem] flex flex-col items-center gap-2 p-6 z-20 blur-background">
            <div class="text-2xl">
              Something Wrong call your admin !!!
            </div>
        </div>
      </div>
      <div v-if="!getLoading && !getError">
        <Chart v-if="chartData" type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed, watchEffect} from "vue";
import Chart from 'primevue/chart';
import { useSummaryStore } from "@/stores/SummaryStore";

const summaryStore = useSummaryStore()

onMounted(() => {
  chartOptions.value = setChartOptions();
  // ******** trigger
  summaryStore.orderComparison()
});

const getLoading = computed(()=>{
  return summaryStore.loadingOrderComparison
})

const getError = computed(()=>{
  return summaryStore.orderComparisonResponseError
})


//todo from API
const chartOptions = ref();

const chartData = computed(() => {
  if(summaryStore.orderComparisonResponse){
    const documentStyle = getComputedStyle(document.documentElement);
    return {
      labels: [`Perubahan Penjualan ${summaryStore.orderComparisonResponse?.percentage}%`],
      datasets: [
        {
          label: `Penjualan ${summaryStore.orderComparisonResponse?.previous?.month}`,
          backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
          borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
          data: [summaryStore.orderComparisonResponse?.previous?.amount]
        },
        {
          label: `Penjualan ${summaryStore.orderComparisonResponse?.current?.month}`,
          backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
          borderColor: documentStyle.getPropertyValue('--p-gray-500'),
          data: [summaryStore.orderComparisonResponse?.current?.amount]
        }
      ]
    };
  }
})

watchEffect(() => 
  chartData,
 { immediate: true })

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