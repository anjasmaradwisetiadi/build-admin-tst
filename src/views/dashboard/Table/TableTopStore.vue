<template>
    <div class="w-full">
        <div class="relative overflow-x-auto">
            <div class="p-4">
                <div class="bg-blue-600 text-white py-2 px-4 rounded-t-md">
                    <h1 class="text-lg font-semibold">Top Store Table ({{ getRespons?.period }})</h1>
                </div>
                <div class="w-full p-4 border rounded-b-md bg-white">
                    <div class="w-full flex justify-end py-6 items-end">
                        <div class="flex flex-col mr-2 w-full lg:w-[10rem] mt-1.5">
                            <span> Limit </span>
                            <Select v-model="limit" :options="limitOption" optionLabel="name" placeholder="Select Limit" class="w-full" />
                        </div>
                        <div class="mt-1.5 flex">
                            <button class="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600" @click="applyFilter()">APPLY</button>
                        </div>
                    </div>
                    <div class="flex w-full overflow-x-auto overflow-y-auto">
                        <table class="min-w-full divide-y divide-gray-200 overflow-x-auto overflow-y-auto ">
                            <thead class="bg-black text-white">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Code</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Location</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <template v-if="!getLoading">
                                    <tr
                                        v-for="(data, index) in getRespons?.items"
                                        :key="index"
                                    >
                                        <td class="px-6 py-4 whitespace-nowrap">{{ data?.name  }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap">{{ data?.code }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap">{{ data?.city }},{{ data?.province }} </td>
                                        <td class="px-6 py-4 whitespace-nowrap">{{ data?.amount }}</td>
                                    </tr>
                                    <tr
                                        v-if="!getRespons?.items?.length"
                                    >
                                        <td class="px-6 py-4 whitespace-nowrap text-center" colspan="6">
                                            Data Not Found
                                        </td>
                                    </tr>
                                </template>
                                <tr v-if="getLoading ">
                                    <td
                                            class="px-6 py-4 whitespace-nowrap text-center h-[10rem]" colspan="4">
                                        <div 
                                            class="w-full flex items-center justify-center z-20">
                                            <img src="@/assets/icon/spinner.svg" alt="spinner">
                                        </div>
                                    </td>
                                </tr>
                                <!-- Repeat rows as needed -->
                                <!-- Additional rows as needed -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted, computed} from 'vue';
import Select from 'primevue/select';
import { useSummaryStore } from "@/stores/SummaryStore";


const summaryStore = useSummaryStore()

const limit = ref({ name: 5})
const limitOption = ref([
    { name: 5},
    { name: 10},
    { name: 20},
])

onMounted(()=>{
  // ******** trigger
  summaryStore.topStore(pagePayload())
})

const getLoading = computed(()=>{
    return summaryStore.loadingTopStore
})

const getRespons = computed(()=>{
    return summaryStore.topStoreResponse
})


const applyFilter = ()=>{
    const pagePayloadFilter = pagePayload(
        limit.value.name
    )

    summaryStore.topStore(pagePayloadFilter)
}

const pagePayload = (
    limit=5,
)=>{
    let concatFilterParams ='';
    let urlParams  = new URLSearchParams(concatFilterParams.search);
        if(limit > 0){
            urlParams.set('limit', limit) 
        }
    return {
        concatFilterParams : urlParams.toString()
    }
}
</script>

<style scoped>
    .page-not-found{
        position: relative;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        display: flex;
    }
</style>