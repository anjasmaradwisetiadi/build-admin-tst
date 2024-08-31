<template>
    <div id="Loading">
        <div
            v-if="props?.loading" 
            id="modal-bg" class="w-full h-full z-40 absolute top-0 absolute blur-background">
        </div>
        <div 
            v-if="props?.loading"
            class="sm:w-[385px] sm:min-w-[30vw] min-w-[60vw] min-h-[30vh] flex flex-col items-center gap-2 -translate-y-1/2 p-6 top-1/2 left-1/2 -translate-x-1/2 absolute z-40"
        >
            <img src="@/assets/icon/spinner.svg" alt="spinner">
        </div>
        <div class="sweet-alert" v-if="(props?.responseSwalSuccess || props?.responseSwalError) && !props?.loading">
           <div style="display: none;">{{responseSwalDisplay}}</div> 
        </div>
    </div>
</template>

<script setup>
import { computed, watch, watchEffect } from 'vue';
import { handleSuccess } from '@/utilize/HandleSuccess';
import { handleError } from '@/utilize/HandleError';

const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    responseSwalSuccess: {
        default: {
            status: false,
            message: ''
        }
    },
    responseSwalError:{
        default: {
            status: false,
            message: ''
        }
    }
})

const responseSwalDisplay = computed(() => {
    const responseSwalError = props?.responseSwalError;
    const responseSwalSuccess = props?.responseSwalSuccess;

    if(responseSwalError?.status && !props.loading){
        return handleError.errorMessage(responseSwalError.message)
    } else if(responseSwalSuccess.status && !props.loading){
        return handleSuccess.successSwalData(responseSwalSuccess.message)
    }
})

</script>

<style scoped>

</style>