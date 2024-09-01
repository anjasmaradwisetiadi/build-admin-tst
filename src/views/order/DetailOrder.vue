<template>
    <div class="w-full mx-6">
        <div class="relative">
            <div class="p-4">
                <div class="w-full">
                    <div class="block bg-white space-y-3 p-4 rounded-lg shadow">
                        <p class="underline">{{ getDetailRespons?.invoice_no }}</p>
                        <h1 class="text-3xl">Total : {{ utilize.formatRupiah(getDetailRespons?.grandtotal)}}</h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="relative">
            <div class="p-4">
                <div class="grid lg:grid-cols-3 gap-3">
                    <div class="block bg-white space-y-3 p-4 rounded-lg shadow">
                        <h1 class="text-3xl">Buyer</h1>
                        <p class="leading-3">Name: {{utilize.handleEmptyString(getDetailRespons?.buyer?.name)}}</p>
                        <p class="leading-3">Phone: {{utilize.handleEmptyString(getDetailRespons?.buyer?.phone) }}</p>
                    </div>
                    <div class="block bg-white space-y-3 p-4 rounded-lg shadow">
                        <h1 class="text-3xl">Store</h1>
                        <p class="leading-3">code: {{utilize.handleEmptyString(getDetailRespons?.store?.code) }}</p>
                        <p class="leading-3">name: {{utilize.handleEmptyString(getDetailRespons?.store?.name) }}</p>
                        <p class="leading-3">province: {{utilize.handleEmptyString(getDetailRespons?.store?.province) }}</p>
                        <p class="leading-3">city: {{utilize.handleEmptyString(getDetailRespons?.store?.city) }}</p>
                    </div>
                    <div class="block bg-white space-y-3 p-4 rounded-lg shadow">
                        <h1 class="text-3xl">Coupon</h1>
                        <p class="leading-3">code: {{utilize.handleEmptyString(getDetailRespons?.coupon?.code)}}</p>
                        <p class="leading-3">name: {{utilize.handleEmptyString(getDetailRespons?.coupon?.name)}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="relative overflow-x-auto">
            <div class="p-4">
                <div class="bg-blue-600 text-white py-2 px-4 rounded-t-md">
                    <h1 class="text-lg font-semibold">Detail Order Table</h1>
                </div>
                <div class="p-4 border rounded-b-md bg-white">
                    <div class="flex w-full overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200 overflow-x-auto">
                            <thead class="bg-black text-white">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-center border-b border-r border-white" colspan="4">Product</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-center border-r border-white" rowspan="2">Qty</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-center" rowspan="2">Total Price</th>
                                </tr>
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-r border-white">Code</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-r border-white">Name</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-r border-white">Category</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-r border-white">Price</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr
                                    v-for="(data, index) in getDetailRespons?.items"
                                    :key="index"
                                >
                                    <td class="px-6 py-4 whitespace-nowrap">{{ utilize.handleEmptyString(data?.product?.code)}}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ utilize.handleEmptyString(data?.product?.name)}}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ utilize.handleEmptyString(data?.product?.category)}}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ utilize.formatRupiah(data?.product?.price) }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ data?.qty }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ utilize.formatRupiah(data?.total_price)}}</td>
                                </tr>
                                <tr
                                    v-if="!getLoading && !getDetailRespons?.items?.length"
                                >
                                    <td class="px-6 py-4 whitespace-nowrap text-center" colspan="6">
                                        Data Not Found
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
import { onMounted, computed, Teleport} from 'vue';
import { useRouter } from 'vue-router';
import { useCouponStore } from '@/stores/CS/OrdersStore';
import LoadingAndAlert from '@/components/LoadingAndAlert.vue';
import { utilize } from '@/utilize';

const router = useRouter();
const couponStore = useCouponStore()


const getLoading = computed(()=>{
    return couponStore.loading
})

const getDetailRespons = computed(()=>{
    return couponStore.detailResponse
})

const getError = computed(()=>{
    return couponStore.errorResponse
})


const detailOrders = () =>{
    const payloadSlug = router.currentRoute.value.params.id;
    couponStore.orderDetail(payloadSlug);
}

onMounted(()=>{
    detailOrders();
})

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