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
          <DatePicker v-model="startDate" :maxDate="endDate" view="year" placeholder="Start Date"  :manualInput="false" dateFormat="yy" />
      </div>
      <div class="flex flex-col mr-2 w-32 lg:w-[10rem] mt-1.5">
          <span> End Date </span>
          <DatePicker v-model="endDate" :minDate="startDate" view="year" placeholder="End Date" :manualInput="false" dateFormat="yy" />
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
      <div class="relative" v-if="!getLoading && getError">
        <div 
            class="w-full h-[10rem] flex flex-col items-center gap-2 p-6 z-20 blur-background">
            <div class="text-2xl">
              Something Wrong call your admin !!!
            </div>
        </div>
      </div>
      <div v-if="!getLoading && !getError">
        <Chart v-if="chartData" type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]"  />
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from "vue";
import Chart from 'primevue/chart';
import DatePicker from 'primevue/datepicker';
import { useSummaryStore } from "@/stores/SummaryStore";
import dayjs from "dayjs";

const summaryStore = useSummaryStore()

const startDate = ref(new Date('2024-01-12'));
const endDate = ref(new Date());

onMounted(() => {
  chartOptions.value = setChartOptions();
  // ******** trigger
  summaryStore.yearlyOrder(pagePayload())
});

const getLoading = computed(()=>{
  return summaryStore.loadingOrderComparison
})

const getError = computed(()=>{
  return summaryStore.yearlyResponseError
})

//todo from API
const chartOptions = ref();

const chartData = computed(() => {
  const labels = [];
  const data = [];
  if(summaryStore?.yearlyResponse?.items?.length){
    for (let chartDataRawElement of summaryStore?.yearlyResponse?.items) {
      labels.push(chartDataRawElement.year)
      data.push(chartDataRawElement.amount)
    }
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

const applyFilter = () =>{
  const pagePayloadFilter = pagePayload(
    startDate.value,
    endDate.value,
  )
  summaryStore.yearlyOrder(pagePayloadFilter)
}

const pagePayload = (
  startDateFilter=(new Date('2024-01-12')),
  endDateFilter=(new Date()),
  )=>{
    let concatFilterParams ='';
    let urlParams  = new URLSearchParams(concatFilterParams.search);
      if (startDateFilter !==''){
          urlParams.set('start_year', dayjs(startDateFilter).format("YYYY")) 
      } 
      if (endDateFilter !==''){
          urlParams.set('end_year', dayjs(endDateFilter).format("YYYY")) 
      } 
    return {
      concatFilterParams : urlParams.toString()
    }
  }
</script>

<style scoped>

</style>