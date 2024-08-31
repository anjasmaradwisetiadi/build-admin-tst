<template>
  <div class="relative min-w-[800px]">
    <div class="w-full flex justify-center">
      <h2 class="text-2xl text-center font-semibold">
          Penjualan Tahunan
      </h2>
    </div>
    <div class="w-full flex justify-end py-4 items-end">
      <div class="flex flex-col mr-2 w-32 lg:w-[10rem] mt-1.5">
          <span> Start Date </span>
          <DatePicker v-model="startDate" placeholder="Start Date"  :manualInput="false" dateFormat="dd/mm/yy" />
      </div>
      <div class="flex flex-col mr-2 w-32 lg:w-[10rem] mt-1.5">
          <span> End Date </span>
          <DatePicker v-model="endDate" placeholder="End Date" :manualInput="false" dateFormat="dd/mm/yy" />
      </div>
      <div class="mt-1.5 flex flex-col">
        <button class="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600" @click="applyFilter()">APPLY</button>
      </div>
    </div>
    <div class="w-full  min-h-[10rem]">
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
import {summaryMonthlyOrder, summaryYearlyOrder} from "@/utilize/DataDummy.js";
import DatePicker from 'primevue/datepicker';
import { useSummaryStore } from "@/stores/SummaryStore";

const summaryStore = useSummaryStore()

const startDate = ref(new Date('2024-01-12'));
const endDate = ref(new Date());

onMounted(() => {
  chartOptions.value = setChartOptions();
  // ******** trigger
  // summaryStore.yearlyOrder(params)
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

<style scoped>

</style>