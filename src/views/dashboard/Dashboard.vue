<template>
    <div class="w-full mx-6">
        <div id="ChartMonthlyOrder" class="relative overflow-x-auto">
            <div class="p-4">
                <div class="p-4 border rounded-lg bg-white shadow-lg overflow-x-auto">
                    <ChartMonthlyOrder></ChartMonthlyOrder>
                </div>
            </div>
        </div>
        <div class="grid lg:grid-cols-2 gap-2 mt-6">
            <div id="ChartYearlyOrder" class="relative overflow-x-auto">
                <div class="px-4 py-4">
                    <div class="p-4 border rounded-lg bg-white shadow-lg overflow-x-auto">
                        <ChartYearlyOrder></ChartYearlyOrder>
                    </div>
                </div>
            </div>
            <div id="ChartCompareOrder" class="relative overflow-x-auto">
                <div class="px-4 lg:pr-4 py-4">
                    <div class="p-4 border rounded-lg bg-white shadow-lg overflow-x-auto">
                        <ChartCompareOrder></ChartCompareOrder>
                    </div>
                </div>
            </div>
        </div>
        <div id="ChartMonthlyOrder" class="relative overflow-x-auto">
            <div class="p-4">
                <div class="p-2 border rounded-lg bg-white shadow-lg overflow-x-auto">
                    <TableTopProduct></TableTopProduct>
                </div>
            </div>
        </div>
        <div class="grid lg:grid-cols-2 gap-2 mt-6">
            <div  class="relative overflow-x-auto">
                <div class="px-4 py-4">
                    <div class="p-4 border rounded-lg bg-white shadow-lg overflow-x-auto">
                        <TableTopBuyer></TableTopBuyer>
                    </div>
                </div>
            </div>
            <div  class="relative overflow-x-auto">
                <div class="px-4 lg:pr-4 py-4">
                    <div class="p-2 border rounded-lg bg-white shadow-lg overflow-x-auto">
                        <TableTopStore></TableTopStore>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, onUpdated, onBeforeMount, computed} from 'vue';
import ChartCompareOrder from './Chart/ChartCompareOrder.vue';
import ChartMonthlyOrder from './Chart/ChartMonthlyOrder.vue';
import ChartYearlyOrder from './Chart/ChartYearlyOrder.vue';
import TableTopProduct from './Table/TableTopProduct.vue';
import TableTopBuyer from './Table/TableTopBuyer.vue';
import TableTopStore from './Table/TableTopStore.vue';


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