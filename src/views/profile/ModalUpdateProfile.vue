<template>
    <div id="ModalUpdateProfile">
        <div
            v-if=" props?.isOpenModal && props?.nameModal === 'update_profile'"
            @click="onToggle(false)"
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
                <div class="flex flex-col mt-1.5" >
                    <div>
                        Name*
                    </div>
                    <div>
                        <input
                            v-model="name"
                            id="name"
                            name="name"
                            autocomplete="name"
                            type="text"
                            required
                            class="block w-full rounded-md border py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-[8px]"
                            placeholder="Name"
                        />
                        <small v-if="isNameError" class="form-text invalid-feedback">Pleasse fill this field</small>
                    </div>
                </div>
                <div class="flex flex-col mt-1.5">
                    <div>
                        Image upload
                    </div>
                    <div class="w-full flex justify-start">
                        <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" @select="onFileSelect" ref="" />
                    </div>
                    <div class="w-36 flex flex-col image-preview mt-4">
                        <div class="">
                            <img :src="imagePreview" alt="image" width="180px" height="180px">
                        </div>
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
  import { ref, watch, computed} from 'vue';
  import { handleError } from '@/utilize/HandleError';
  import FileUpload from 'primevue/fileupload';
  import { useAuthStore } from '@/stores/AuthStore';

  const authStore = useAuthStore()
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

  const name = ref('');
  const imageFile = ref('');
  const imagePreview = ref('')
  const isNameError = ref('')

  const getDetailResponse = computed(()=>{
    return authStore.profileResponse
  })

  watch(getDetailResponse,(newValue, oldValue)=>{
    if(newValue){
        name.value = newValue?.name
        imagePreview.value = newValue?.profile_image
    }
  })

  const checkValidty = () => {
        const nameValidty = name.value ? false : true

        isNameError.value = nameValidty

        return nameValidty
  }
    const resetState = () =>{
        name.value = '';
        imageFile.value = '';
        imagePreview.value = ''
        isNameError.value = false
    }

    const onFileSelect = ($event) => {
        const dataImage = $event.files;

        if(dataImage){
            const imagePreviewUrl = dataImage[0] ? URL.createObjectURL(dataImage[0]) : null
            imagePreview.value = imagePreviewUrl
            imageFile.value = dataImage[0]
        }
    };

  function onToggle(data) {
    const result = checkValidty()
    const payloadModal = {
        name: props.nameModal,
        value: data
    }

    if(data){
        if(!result){
                const payload = {
                    name: name.value,
                }
                payload['profile_image'] = imageFile.value
                authStore.profileUpdate(payload)

            resetState()
            emit('isOpenModelCloseGeneral', payloadModal)   
        } else {
            handleError.errorMessage('Please fill required input')
        }
    } else {
        resetState()
        emit('isOpenModelCloseGeneral', payloadModal)   
    }
}
</script>

<style scoped>
    .style-image-preview-wrap{
        margin-top:10px;
        width: 160px;
    }

    .style-image-preview-wrap-pointer{
        text-decoration: none !important;
        color: whitespace;
        cursor: pointer;
    }
</style>