<template>
    <div class="w-full mx-6">
        <div class="relative overflow-x-auto">
            <div class="p-4">
                <div class="bg-blue-600 text-white py-2 px-4 rounded-t-md">
                    <h1 class="text-lg font-semibold">Invitations Labels Table</h1>
                </div>

                <div class="p-4 border rounded-b-md bg-white">
                    <div class="flex justify-end my-4 space-x-2">
                        <button class="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">RESET</button>
                        <button class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">APPLY</button>
                        <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">ADD</button>
                    </div>

                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-black text-white">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Item</th>
                                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap">Komunitas</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <a href="#" class="text-green-600 hover:underline mr-4">DETAIL</a>
                                    <a href="#" class="text-yellow-600 hover:underline mr-4">EDIT</a>
                                    <a href="#" class="text-red-600 hover:underline">DELETE</a>
                                </td>
                            </tr>
                            <!-- Repeat rows as needed -->
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap">Data 16</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <a href="#" class="text-green-600 hover:underline mr-4">DETAIL</a>
                                    <a href="#" class="text-yellow-600 hover:underline mr-4">EDIT</a>
                                    <a href="#" class="text-red-600 hover:underline">DELETE</a>
                                </td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap">Data 15</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <a href="#" class="text-green-600 hover:underline mr-4">DETAIL</a>
                                    <a href="#" class="text-yellow-600 hover:underline mr-4">EDIT</a>
                                    <a href="#" class="text-red-600 hover:underline">DELETE</a>
                                </td>
                            </tr>
                            <!-- Additional rows as needed -->
                        </tbody>
                    </table>
                </div>
            </div>
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