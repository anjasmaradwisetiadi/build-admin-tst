<template>
    <div class="w-full mx-6">
        <div class="relative">
            <div class="p-4">
                <div class="w-full">
                    <div class="block bg-white space-y-3 p-4 rounded-lg shadow">
                        <small>{{ listOrdersDatas.invoice_no }}</small>
                        <h1 class="text-3xl">Total : {{ listOrdersDatas.grandtotal }}</h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="relative">
            <div class="p-4">
                <div class="grid lg:grid-cols-3 gap-3">
                    <div class="block bg-white space-y-3 p-4 rounded-lg shadow">
                        <h1 class="text-3xl">Buyer</h1>
                        <p class="leading-3">Name: {{listOrdersDatas.buyer.name}}</p>
                        <p class="leading-3">Phone: {{listOrdersDatas.buyer.phone}}</p>
                    </div>
                    <div class="block bg-white space-y-3 p-4 rounded-lg shadow">
                        <h1 class="text-3xl">Buyer</h1>
                        <p class="leading-3">code: {{listOrdersDatas.store.code}}</p>
                        <p class="leading-3">name: {{listOrdersDatas.store.name}}</p>
                        <p class="leading-3">province: {{listOrdersDatas.store.province}}</p>
                        <p class="leading-3">city: {{listOrdersDatas.store.city}}</p>
                    </div>
                    <div class="block bg-white space-y-3 p-4 rounded-lg shadow">
                        <h1 class="text-3xl">Coupon</h1>
                        <p class="leading-3">code: {{listOrdersDatas.coupon.code}}</p>
                        <p class="leading-3">name: {{listOrdersDatas.coupon.name}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="relative overflow-x-auto">
            <div class="p-4">
                <div class="bg-blue-600 text-white py-2 px-4 rounded-t-md">
                    <h1 class="text-lg font-semibold">Detail order</h1>
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
                                    v-for="(data, index) in listOrdersDatas.items"
                                    :key="index"
                                >
                                    <td class="px-6 py-4 whitespace-nowrap">{{ data.product.code }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ data.product.name }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ data.product.category }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ data.product.price }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ data?.qty }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ data?.total_price }}</td>
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
import { ref, watch, onMounted, onUpdated, onBeforeMount, computed} from 'vue';
import { dataDummyEmployee, detailOrders } from '@/utilize/DataDummy';
const datas = ref(dataDummyEmployee)
const listOrdersDatas = ref(detailOrders)

import Select from 'primevue/select';

const selectedCountry = ref();
const countries = ref([
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
]);



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