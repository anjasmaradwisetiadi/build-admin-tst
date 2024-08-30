<template>
  <div class="relative z-30">
    <div class="click-outside">
        <button
          class=" py-2 px-5 bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75" 
          @click="openModal()">
          testting click 
        </button>
    </div>
    <div v-show="open">
      open data
    </div>
    <ModalEvent
      :openModal="open"
      @closeModal="closeModal"
    ></ModalEvent>
  </div>
</template>

<script setup>

import { ref } from 'vue';
import ModalEvent from '@/components/ModalEvent.vue'
// State to toggle dropdown visibility
const open = ref(true);

// Method to close the dropdown
const openModal = () => {
    console.log("close dropdown")
    open.value = true;
};
const closeModal = ($event)=>{
  console.log("$event close Modal =")
  console.log($event)
  open.value = $event
}

const dateValue = ref([]);

const onSelectSomething = (newDate) => {
  console.log(newDate); // newDate instanceof dayjs
};

</script>

<style scoped>
  .click-outside{
    width: 20rem;
    height: 20rem;
    background-color: red;
  }
</style>