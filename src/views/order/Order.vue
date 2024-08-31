<template>
    <div class="w-full mx-6">
        <div class="relative overflow-x-auto">
            <div class="p-4">
                <div class="bg-blue-600 text-white py-2 px-4 rounded-t-md">
                    <h1 class="text-lg font-semibold">Orders Table</h1>
                </div>
                <div class="p-4 border rounded-b-md bg-white">
                    <div class="flex justify-end space-x-2">
                        <button class="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800" @click="applyReset()">RESET</button>
                        <button class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600" @click="applyFilter()">APPLY</button>
                    </div>
                    <div class="w-full flex flex-row flex-wrap lg:flex-nowrap my-3 ">
                        <div class="flex flex-col mr-2 w-full lg:w-[10rem] mt-1.5">
                            <span> Search Item </span>
                            <input 
                                v-model="searchQuery"
                                type="text" name="search_item" id="search_item" class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Search Item">
                        </div>
                        <div class="flex flex-col mr-2 w-full lg:w-[10rem] mt-1.5">
                            <span> Buyer Phone </span>
                            <input 
                                v-model="buyerPhone"
                                type="text" name="buyer_phone" id="buyer_phone" class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Buyer Phone">
                        </div>
                        <div class="flex flex-col mr-2 w-full lg:w-[10rem] mt-1.5">
                            <span> Store Code </span>
                            <input 
                                v-model="storeCode"
                                type="text" name="store_code" id="store_code" class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Store Code">
                        </div>
                        <div class="flex flex-col mr-2 w-full lg:w-[10rem] mt-1.5">
                            <span> Coupon Code </span>
                            <input 
                                v-model="couponCode"
                                type="text" name="coupon_code" id="coupon_code" class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Coupon Code">
                        </div>
                        <div class="flex flex-col mr-2 w-full lg:w-[10rem] mt-1.5">
                            <span> Search By </span>
                            <input 
                                v-model="searchBy"
                                type="text" name="search_by" id="search_by" class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Search By">
                        </div>
                        <div class="flex flex-col mr-2 w-full lg:w-[10rem] mt-1.5">
                            <span> Start Date </span>
                            <DatePicker v-model="startDate" placeholder="Start Date"  :manualInput="false" dateFormat="dd/mm/yy" />
                        </div>
                        <div class="flex flex-col mr-2 w-full lg:w-[10rem] mt-1.5">
                            <span> End Date </span>
                            <DatePicker v-model="endDate" placeholder="End Date" :manualInput="false" dateFormat="dd/mm/yy" />
                        </div>
                        <div class="flex flex-col mr-2 w-full lg:w-[10rem] mt-1.5">
                            <span> Sort by </span>
                            <div class="flex">
                                <Select v-model="selectedSortBy" :options="dataSortBy" filter optionLabel="name" placeholder="Sort by" class="w-full md:w-56">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value" class="flex items-center">
                                            <div>{{ slotProps.value.name }}</div>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                    <template #option="slotProps">
                                        <div class="flex items-center">
                                            <div>{{ slotProps.option.name }}</div>
                                        </div>
                                    </template>
                                </Select>
                            </div>
                        </div>
                        <div class="flex flex-col mr-2 w-full lg:w-[10rem] mt-1.5">
                            <span> Sort direction </span>
                            <div class="flex">
                                <Select v-model="selectedSortDirection" :options="dataSortDirection" filter optionLabel="name" placeholder="Sort direction" class="w-full md:w-56">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value" class="flex items-center">
                                            <div>{{ slotProps.value.name }}</div>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                    <template #option="slotProps">
                                        <div class="flex items-center">
                                            <div>{{ slotProps.option.name }}</div>
                                        </div>
                                    </template>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div class="flex w-full overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200 overflow-x-auto">
                            <thead class="bg-black text-white">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Invoice No</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Grand Total</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Buyer</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Store</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Coupon</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr
                                    v-for="(data, index) in getOrdersResponse?.items"
                                    :key="index"
                                >
                                    <td class="px-6 py-4 whitespace-nowrap">{{ data?.invoice_no }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ data?.grandtotal }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ data?.buyer?.name }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ data?.store?.store }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ data?.coupon?.name }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        
                                        <a  
                                            @click="goToDetail(data.invoice_no)"
                                            class="text-green-600 hover:underline mr-4 cursor-pointer">
                                            <span class="material-symbols-outlined">
                                                visibility
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                                <tr
                                    v-if="!getLoading && !getOrdersResponse?.items.length"
                                >
                                    <td class="px-6 py-4 whitespace-nowrap text-center" colspan="6">
                                        Data Not Found
                                    </td>
                                </tr>
                                <tr
                                    v-if="getOrdersResponse?.total>10"
                                >
                                    <td 
                                        class="px-6 py-4 whitespace-nowrap bg-gray-100" colspan="6">
                                        <Paginator 
                                            :rows="perRowsPageNumber" 
                                            :totalRecords="getOrdersResponse?.total" 
                                            :rowsPerPageOptions="[10, 20, 30]"
                                            @page="onPageChange"
                                        >
                                        </Paginator>
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
    <Teleport
        id="ModalEvent" 
        class="z-40"
        to="body"
        v-if="getLoading"
     >
        <LoadingAndAlert
            :loading="getLoading"
            :responseSwalError="getError"
        >

        </LoadingAndAlert>
     </Teleport>
</template>

<script setup>
    import { ref, watch, onMounted, onUpdated, onBeforeMount, computed, watchEffect, Teleport} from 'vue';
    import { dataDummyEmployee, listOrders } from '@/utilize/DataDummy';
    import Select from 'primevue/select';
    import DatePicker from 'primevue/datepicker';
    import { useCouponStore } from '@/stores/CS/OrdersStore';
    import { utilize } from '@/utilize';
    import LoadingAndAlert from '@/components/LoadingAndAlert.vue';
    import { useRouter } from 'vue-router';
    import Paginator from 'primevue/paginator';


    const couponStore = useCouponStore()
    const router = useRouter();

    const datas = ref(dataDummyEmployee)
    const pageNumber = ref(1)
    const perRowsPageNumber = ref(10)
    const selectedSortBy = ref({ name: 'Grand Total', value: 'grandtotal' });
    const selectedSortDirection = ref({ name: 'Desc', value: 'desc' });
    const buyerPhone = ref('');
    const storeCode = ref('');
    const couponCode = ref('');
    const searchBy = ref('invoice_no');
    const startDate = ref(new Date('2024-01-12'));
    const endDate = ref(new Date());
    const searchQuery = ref('');


    const dataSortDirection = ref([
        { name: 'Asc', value: 'asc' },
        { name: 'Desc', value: 'desc' },
    ]);
    const dataSortBy = ref([
        { name: 'Grand Total', value: 'grandtotal' },
        { name: 'Created At', value: 'created_at' },
    ]);

    const getLoading = computed(()=>{
        return couponStore.loading
    })

    const getOrdersResponse = computed(()=>{
        return couponStore.ordersResponse
    })

    const getError = computed(()=>{
        return couponStore.errorResponse
    })

    watchEffect(() => 
        getOrdersResponse,
    { immediate: true })

    onMounted(()=>{
        couponStore.orderList(pagePayload())
    })

    const applyFilter = () =>{

        const pagePayloadFilter = pagePayload(
            pageNumber.value,
            perRowsPageNumber.value,
            selectedSortBy.value.value,
            selectedSortDirection.value.value,
            buyerPhone.value,
            storeCode.value,
            couponCode.value,
            searchBy.value,
            startDate.value,
            endDate.value,
            searchQuery.value
        )
        couponStore.orderList(pagePayloadFilter)
    }

    const pagePayload = (
        page=1,
        perPage=10,
        sortByFilter='grandtotal',
        sortDirectionFilter = 'desc',
        buyerPhoneFilter = '',
        storeCodeFilter='',
        couponCodeFilter='',
        searchByFilter='invoice_no',
        startDateFilter=(new Date('2024-01-12')),
        endDateFilter=(new Date()),
        searchQueryFilter=''
    ) => {
        let concatFilterParams ='';
        let urlParams  = new URLSearchParams(concatFilterParams.search);
            if(perPage > 1){
                urlParams.set('per_page', perPage) 
            }
            if(page > 0){
                urlParams.set('page', page) 
            }
            if (sortByFilter !==''){
                urlParams.set('sort_by', sortByFilter) 
            }  
            if (sortDirectionFilter !==''){
                urlParams.set('sort_direction', sortDirectionFilter) 
            } 
            if (buyerPhoneFilter !==''){
                urlParams.set('buyer_phone', buyerPhoneFilter) 
            } 
            if (storeCodeFilter !==''){
                urlParams.set('store_code', storeCodeFilter) 
            } 
            if (couponCodeFilter !==''){
                urlParams.set('coupon_code', couponCodeFilter) 
            } 
            if (searchByFilter !==''){
                urlParams.set('search_by', searchByFilter) 
            } 
            if (startDateFilter !==''){
                urlParams.set('start_date', utilize.convertTimeDate(startDateFilter)) 
            } 
            if (endDateFilter !==''){
                urlParams.set('end_date', utilize.convertTimeDate(endDateFilter)) 
            } 
            if (searchQueryFilter !==''){
                urlParams.set('search_query', searchQueryFilter) 
            } 

            return {
                concatFilterParams : urlParams.toString()
            }
    }

    const applyReset = () =>{
        pageNumber.value = 1
        perRowsPageNumber.value = 10
        selectedSortBy.value = { name: 'Grand Total', value: 'grandtotal' }
        selectedSortDirection.value = { name: 'Desc', value: 'desc' }
        buyerPhone.value = ''
        storeCode.value = ''
        couponCode.value = ''
        searchBy.value = 'invoice_no'
        startDate.value = new Date('2024-01-12')
        endDate.value = new Date()
        searchQuery.value = ''
        couponStore.orderList(pagePayload())
    }

    const onPageChange = (event)=>{

            pageNumber.value = event.page
            perRowsPageNumber.value = event.rows

            const pagePayloadFilter = pagePayload(
                (event.page+1),
                event.rows,
                selectedSortBy.value.value,
                selectedSortDirection.value.value,
                buyerPhone.value,
                storeCode.value,
                couponCode.value,
                searchBy.value,
                startDate.value,
                endDate.value,
                searchQuery.value
            )
            couponStore.orderList(pagePayloadFilter)


    }

    const goToDetail = (id)=>{
        router.push(`/order/${id}`)
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