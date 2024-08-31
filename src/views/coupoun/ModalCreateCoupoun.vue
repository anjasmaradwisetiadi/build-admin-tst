<template>
    <div id="ModalCreateCoupoun">
        <div
            v-if=" props?.isOpenModal"
            id="modal-bg" class="w-full h-full z-50 fixed top-0 left-0 blur-background overflow-hidden">
        </div>
        <div
            v-if="props?.isOpenModal" 
            class="w-[385px] min-w-[30vw] lg:w-[385px] lg:min-w-[30vw] lg:min-h-[20vh] flex flex-col items-center gap-2 -translate-y-1/2 bg-white rounded-lg top-1/2 left-1/2 -translate-x-1/2 shadow-md z-50 border border-solid border-gray-200 fixed">
            <header class="flex w-full justify-between py-6 px-6 border-b border-gray-400">
                <div>
                    <h2 class="text-xl text-blue-primary font-medium mt-2">{{props?.responseModal?.title}} </h2>
                </div>
                <div>
                    <span class="material-symbols-outlined md:text-2xl lg:text-2xl text-lg cursor-pointer" @click="onToggle(false)">
                        close
                    </span>
                </div>
            </header>
            <main class="w-full px-6 py-3">
                <div class="flex flex-col" v-if="props?.nameModal !== 'update_coupoun'">
                    <div>
                        Name*
                    </div>
                    <div>
                        <input
                            v-model="name"
                            id="name"
                            name="name"
                            autocomplete="Name"
                            type="text"
                            required
                            class="block w-full rounded-md border py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-[8px]"
                            placeholder="Name"
                            :disabled="isEdit"
                        />
                        <small v-if="isNameError" class="form-text invalid-feedback">Pleasse fill this field</small>
                    </div>
                </div>
                <div class="flex flex-col mt-1.5" v-if="props?.nameModal !== 'update_coupoun'">
                    <div>
                        Code*
                    </div>
                    <div>
                        <input
                            v-model="code"
                            id="code"
                            name="code"
                            autocomplete="code"
                            type="text"
                            required
                            class="block w-full rounded-md border py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-[8px]"
                            placeholder="Code"
                            :disabled="isEdit"
                        />
                        <small v-if="isCodeError" class="form-text invalid-feedback">Pleasse fill this field</small>
                    </div>
                </div>
                <div class="flex flex-col mt-1.5">
                    <div>
                        Start Date*
                    </div>
                    <div class="w-full">
                        <DatePicker v-model="startDate" placeholder="Start Date"  :manualInput="false" dateFormat="dd/mm/yy" class="w-full" />
                        <small v-if="isCodeError" class="form-text invalid-feedback">Pleasse fill this field</small>
                    </div>
                </div>
                <div class="flex flex-col mt-1.5">
                    <div>
                        End Date*
                    </div>
                    <div class="w-full">
                        <DatePicker v-model="endDate" placeholder="End Date" :manualInput="false" dateFormat="dd/mm/yy" class="w-full" />
                        <small v-if="isCodeError" class="form-text invalid-feedback">Pleasse fill this field</small>
                    </div>
                </div>
            </main>
            <footer class="flex w-full justify-end px-6">
                <div class="flex ">
                    <button id="modal-close" class="py-2 px-6 bg-sky-400 rounded-lg text-white mb-7 mr-2"
                        @click="onToggle(true)"
                    > Submit </button>
                </div>
                <div class="flex">
                    <button id="modal-close" class="py-2 px-6 bg-red-primary rounded-lg text-white mb-7"
                        @click="onToggle(false)"
                    > Cancel </button>
                </div>
            </footer>
        </div>
    </div>
</template>

<script setup>
  import { ref, watch, computed, onMounted, onBeforeMount, Teleport } from 'vue';
  import { handleError } from '@/utilize/HandleError';
  import DatePicker from 'primevue/datepicker';

  const props = defineProps({
    loading:{
        default: false
    },
    responseModal:{
        type: Object,
        default() {
            return {
                title: 'Something Wrong',
                message: 'Please contact your admin',
            }
        }
    },
    // for add name modal unique
    nameModal: {
        default: ''
    },
    isOpenModal: {
        default: false
    },
    id: {
        type: String,
        default: ''
    },
    idSubActivity: {
        type: String,
        default: ''
    }
  })

  const emit = defineEmits([
    'isOpenModelCloseGeneral',
  ]);
  const code = ref('')
  const name = ref('')
  const startDate = ref(new Date('2024-01-12'));
  const endDate = ref(new Date());
  
  const isNameError = ref(false)
  const isCodeError = ref(false)

  const checkValidty = () => {
//         const nameValidty = nameActivity.value ? false : true
// 
//         isNameError.value = nameValidty
// 
//         return nameValidty
  }
    const resetState = () =>{
        // isNameError.value = false
    }

  function onToggle(data) {
    const result = checkValidty()
    const payload = {
        name: props.nameModal,
        value: data
    }

    if(data){
        if(!result){
//             if(selectedOption.value === 'activity_task'){
//                 const payload = {
//                     title: nameActivity.value,
//                     type: 'activity_task'
//                 }
//                 activitiesStore.activitiesCreate(payload)
//             } else {
//                 const payload = {
//                     title: nameActivity.value,
//                     type: 'activity_text'
//                 }
//                 activitiesStore.activitiesCreate(payload)
//             }
// 
//             resetState()
//             emit('isOpenModelCloseGeneral', payload)   
        } else {
            handleError.errorMessage('Please fill required input')
        }
    } else {
        resetState()
        emit('isOpenModelCloseGeneral', payload)   
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