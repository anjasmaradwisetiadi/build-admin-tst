<template>
    <div id="ModalCreateOrder">
        <div
            v-if=" props?.isOpenModal && props?.nameModal === 'update_profile'"
            id="modal-bg" class="w-full h-full z-50 fixed top-0 left-0 blur-background overflow-hidden">
        </div>
        <div
            v-if="props?.isOpenModal && props?.nameModal === 'update_profile'" 
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
                <div> Testing Update Profile</div>
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
  import { HandleError } from '@/utilize/HandleError';
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
            HandleError.errorMessage('Please fill required input')
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