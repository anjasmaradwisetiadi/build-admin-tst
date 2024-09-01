<template>
    <div id="ModalCreateCoupoun">
        <div
            v-if=" props?.isOpenModal"
            @click="onToggle(false)"
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
                            :disabled="props.nameModal === 'detail_coupoun'"
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
                            :disabled="props.nameModal === 'detail_coupoun'"
                        />
                        <small v-if="isCodeError" class="form-text invalid-feedback">Pleasse fill this field</small>
                        <small v-if="!isCodeError && isCodeLength" class="form-text invalid-feedback">The code field must be 8 characters.</small>
                    </div>
                </div>
                <div class="flex flex-col mt-1.5">
                    <div>
                        Start Date*
                    </div>
                    <div class="w-full">
                        <DatePicker v-model="startDate" placeholder="Start Date"  :manualInput="false" dateFormat="dd/mm/yy" class="w-full" :disabled="props.nameModal === 'detail_coupoun'" />
                    </div>
                </div>
                <div class="flex flex-col mt-1.5">
                    <div>
                        End Date*
                    </div>
                    <div class="w-full">
                        <DatePicker v-model="endDate" placeholder="End Date" :manualInput="false" dateFormat="dd/mm/yy" class="w-full" :disabled="props.nameModal === 'detail_coupoun'"/>
                    </div>
                </div>
            </main>
            <footer class="flex w-full justify-end px-6">
                <div
                    v-if="props.nameModal !== 'detail_coupoun'" 
                    class="flex ">
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
  import { useCouponStore } from '@/stores/CS/CouponStore';
  import { utilize } from '@/utilize';

  const couponStore = useCouponStore()

  const props = defineProps({
    loading:{
        default: false
    },
    responseModal:{
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
  const isCodeLength = ref (false)


  const getDetailResponse = computed(()=>{
    return couponStore.detailResponse
  })

  watch(getDetailResponse,(newValue, oldValue)=>{
    if(newValue && (props.nameModal !== 'create_coupoun')){
        code.value = newValue?.code
        name.value = newValue?.name
        startDate.value = new Date(newValue?.start_date)
        endDate.value = new Date(newValue?.end_date)
    }
  })

  const checkValidty = () => {
        const codeValidty = code.value ? false : true
        const nameValidty = name.value ? false : true
        const codeLengthValidity  = code.value.length === 8 ? false: true

        isCodeError.value = codeValidty
        isNameError.value = nameValidty
        isCodeLength.value = codeLengthValidity

        return nameValidty || codeValidty ||codeLengthValidity
  }
    const resetState = () =>{
        isNameError.value = false
        isCodeError.value = false
        isCodeLength.value = false
        code.value = ''
        name.value = ''
        startDate.value = new Date(new Date('2024-01-12'))
        endDate.value = new Date(new Date())
    }

  function onToggle(data) {
    const result = checkValidty()
    const payloadModal = {
        name: props.nameModal,
        value: data
    }

    if(data){
        if(!result){
            if(props?.nameModal === 'create_coupoun'){
                const payload = {
                    code: code.value,
                    name: name.value,
                    start_date: utilize.convertTimeDate(startDate.value),
                    end_date: utilize.convertTimeDate(endDate.value)
                }
                couponStore.couponCreate(payload)
            } else {
                const payload = {
                    start_date: utilize.convertTimeDate(startDate.value),
                    end_date: utilize.convertTimeDate(endDate.value)
                }

                couponStore.couponEdit(code.value, payload)
            }

            resetState()
            emit('isOpenModelCloseGeneral', payloadModal)   
        } else {
            handleError.errorMessage('Something Wrong ')
        }
    } else {
        resetState()
        emit('isOpenModelCloseGeneral', payloadModal)   
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