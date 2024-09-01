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
                        <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" @click="createData()">ADD</button>
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
                            <span> Search by </span>
                            <div class="flex">
                                <Select v-model="selectedSearchBy" :options="dataSearchBy" filter optionLabel="name" placeholder="Sort by" class="w-full md:w-56">
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
                            <span> Sort by </span>
                            <div class="flex">
                                <Select v-model="selectedSortBy" :options="dataSortBy" filter optionLabel="name" placeholder="Search by" class="w-full md:w-56">
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
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Code</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Start Date</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">End Date</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr
                                    v-for="(data, index) in getCoupounResponse?.items"
                                    :key="index"
                                >
                                    <td class="px-6 py-4 whitespace-nowrap">{{ data?.code }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ data?.name }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ data?.start_date }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ data?.end_date }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <a  
                                            @click="goToDetail(data?.code)"
                                            class="text-green-600 hover:underline mr-4 cursor-pointer">
                                            <span class="material-symbols-outlined">
                                                visibility
                                            </span>
                                        </a>
                                        <a  
                                            @click="goToUpdate(data?.code)"
                                            class="text-yellow-600 hover:underline mr-4 cursor-pointer">
                                            <span class="material-symbols-outlined">
                                                edit
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                                <tr
                                    v-if="!getLoading && !getCoupounResponse?.items.length"
                                >
                                    <td class="px-6 py-4 whitespace-nowrap text-center" colspan="6">
                                        Data Not Found
                                    </td>
                                </tr>
                                <tr
                                    v-if="getCoupounResponse?.total>10"
                                >
                                    <td 
                                        class="px-6 py-4 whitespace-nowrap bg-gray-100" colspan="6">
                                        <Paginator 
                                            :rows="perRowsPageNumber" 
                                            :totalRecords="getCoupounResponse?.total" 
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
     >
        <LoadingAndAlert
            :loading="getLoading"
            :responseSwalError="getError"
            :responseSwalSuccess="getSuccess"
        >
        </LoadingAndAlert>
     </Teleport>
     <ModalCreateCoupoun
        :isOpenModal="getIsOpenModalGlobal"
        :nameModal="getNameModal" 
        @isOpenModelCloseGeneral="isOpenModelCloseServer"
        :responseModal="getResponseModalGlobal" 
        :id="idEdit"
     >

     </ModalCreateCoupoun>
</template>

<script setup>
    import { ref, watch, onMounted, onUpdated, onBeforeMount, computed, watchEffect, Teleport} from 'vue';
    import { dataDummyEmployee, listCoupoun } from '@/utilize/DataDummy';
    import Select from 'primevue/select';
    import DatePicker from 'primevue/datepicker';
    import { useCouponStore } from '@/stores/CS/CouponStore';
    import { utilize } from '@/utilize';
    import LoadingAndAlert from '@/components/LoadingAndAlert.vue';
    import { useRouter } from 'vue-router';
    import Paginator from 'primevue/paginator';
    import ModalCreateCoupoun from './ModalCreateCoupoun.vue';
    import { useFormDataModalStore } from '@/stores/FormDataModalStore';
    import { handleSuccess } from '@/utilize/HandleSuccess';

    const formDataModalStore = useFormDataModalStore()
    const couponStore = useCouponStore()
    const router = useRouter();

    const datas = ref(listCoupoun)
    const pageNumber = ref(1)
    const perRowsPageNumber = ref(10)
    const selectedSortBy = ref({ name: 'Name', value: 'name' });
    const selectedSortDirection = ref({ name: 'Ascending', value: 'asc' });
    const selectedSearchBy = ref( { name: 'Code', value: 'code' })
    const searchQuery = ref('');
    const idEdit = ref('');


    const dataSortDirection = ref([
        { name: 'Ascending', value: 'asc' },
        { name: 'Descending', value: 'desc' },
    ]);
    const dataSortBy = ref([
        { name: 'Name', value: 'name' },
        { name: 'Created At', value: 'created_at' },
    ]);
    const dataSearchBy = ref([
        { name: 'Code', value: 'code' },
        { name: 'Name', value: 'name' },
    ]);

    const getLoading = computed(()=>{
        return couponStore.loading
    })

    const getCoupounResponse = computed(()=>{
        return couponStore.couponResponse
    })

    const getError = computed(()=>{
        return couponStore.errorResponse
    })

    const getSuccess = computed(()=>{
        if(couponStore?.updateResponse?.message === 'update'){
            couponStore.couponList(pagePayload())
            return couponStore?.updateResponse
        } else if(couponStore?.createResponse?.message === 'create'){
            couponStore.couponList(pagePayload())
            return couponStore?.createResponse
        }
    })

    onMounted(()=>{
        couponStore.couponList(pagePayload())
    })

    //********** */ form modal data trigger response 
    const getIsOpenModalGlobal = computed(()=>{
        return formDataModalStore.isOpenModalGlobal
    })
    const getNameModal = computed(()=>{
        return formDataModalStore.nameModal
    })
    const getResponseModalGlobal = computed(()=>{
        return formDataModalStore.responseModalGlobal
    })



    const applyFilter = () =>{

        const pagePayloadFilter = pagePayload(
            pageNumber.value,
            perRowsPageNumber.value,
            selectedSortBy.value.value,
            selectedSortDirection.value.value,
            selectedSearchBy.value.value,
            searchQuery.value
        )
        couponStore.couponList(pagePayloadFilter)
    }

    const pagePayload = (
        page=1,
        perPage=10,
        sortByFilter='name',
        sortDirectionFilter = 'asc',
        searchByFilter='code',
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
            if (searchByFilter !==''){
                urlParams.set('search_by', searchByFilter) 
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
        selectedSortBy.value = { name: 'Name', value: 'name' } 
        selectedSortDirection.value = { name: 'Ascending', value: 'asc' }
        selectedSearchBy.value = { name: 'Code', value: 'code' }
        searchQuery.value = ''

        couponStore.couponList(pagePayload())
    }

    const onPageChange = (event)=>{

            pageNumber.value = event.page + 1
            perRowsPageNumber.value = event.rows

            const pagePayloadFilter = pagePayload(
                (event.page+1),
                event.rows,
                selectedSortBy.value.value,
                selectedSortDirection.value.value,
                selectedSearchBy.value.value,
                searchQuery.value
            )
            couponStore.couponList(pagePayloadFilter)
    }

    const goToUpdate = (id) =>{
        couponStore.couponDetail(id)
        const isOpenModalGlobal = true;
        const nameModal ='update_coupoun';
        const responseModalGlobal = {
            title: 'Update Coupoun',
            message: ''
        }

        const payload = {
            'isOpenModalGlobal': isOpenModalGlobal,
            'nameModal': nameModal,
            'responseModalGlobal': responseModalGlobal
        }
        formDataModalStore.onActivatedModal(payload)
    }

    const goToDetail = (id)=>{
        couponStore.couponDetail(id)
        const isOpenModalGlobal = true;
        const nameModal ='detail_coupoun';
        const responseModalGlobal = {
            title: 'Detail Coupoun',
            message: ''
        }

        const payload = {
            'isOpenModalGlobal': isOpenModalGlobal,
            'nameModal': nameModal,
            'responseModalGlobal': responseModalGlobal
        }
        formDataModalStore.onActivatedModal(payload)

    }

    const createData = ()=>{
        const isOpenModalGlobal = true;
        const nameModal ='create_coupoun';
        const responseModalGlobal = {
            title: 'Create Coupoun',
            message: ''
        }

        const payload = {
            'isOpenModalGlobal': isOpenModalGlobal,
            'nameModal': nameModal,
            'responseModalGlobal': responseModalGlobal
        }
        formDataModalStore.onActivatedModal(payload)
    }

    const isOpenModelCloseServer = (event) =>{
        formDataModalStore.onDeactivatedModal();
        couponStore.resetData();
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