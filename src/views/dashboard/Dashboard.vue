<template>
    <div class="w-full">
        <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    User name
                </th>
                <th scope="col" class="px-6 py-3">
                    First name
                </th>
                <th scope="col" class="px-6 py-3">
                    last name
                </th>
                <th scope="col" class="px-6 py-3">
                    email
                </th>
            </tr>
        </thead>
        <tbody>
            <tr 
                v-for="(data, index) in datas"
                :key="index"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{data.user_name}}
                </th>
                <td class="px-6 py-4">
                    {{data.first_name}}
                </td>
                <td class="px-6 py-4">
                    {{data.last_name}}
                </td>
                <td class="px-6 py-4">
                    {{data.email}}
                </td>
            </tr>
        </tbody>
    </table>
</div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, onUpdated, onBeforeMount, computed} from 'vue';
import { dataDummyEmployee } from '@/utilize/DataDummy';

const datas = ref(dataDummyEmployee)

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