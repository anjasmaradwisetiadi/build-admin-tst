<template>
    <div id="ModalUpdateProfile">
    <div
        v-if=" props?.isOpenModal && props?.nameModal === 'update_password'"
        @click="onToggle(false)"
        id="modal-bg" class="w-full h-full z-50 fixed top-0 left-0 blur-background overflow-hidden">
    </div>
      <form @submit.prevent="onToggle(true)">
        <div
            v-if="props?.isOpenModal && props?.nameModal === 'update_password'" 
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
              <div class="flex flex-col mb-1.5 gap-2">
                <div>Current Password</div>
                <input
                   v-model="updatePasswordData.currentPassword"
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder="••••••••" 
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                <small v-if="updatePasswordError.currentPassword.length > 0" class="form-text invalid-feedback">{{updatePasswordError.currentPassword.join(",")}}</small>

                <!-- <Password v-model="updatePasswordData.currentPassword" placeholder="Current Password" aria-label="current password" :invalid="updatePasswordError.currentPassword.length > 0" :feedback="false" />
                <Message v-if="updatePasswordError.currentPassword.length > 0" severity="error">{{updatePasswordError.currentPassword.join(",")}}</Message> -->
              </div>
              <div class="flex flex-col mb-1.5 gap-2">
                <div>New Password</div>
                <input
                   v-model="updatePasswordData.newPassword"
                  type="password" 
                  name="new_password" 
                  id="new_password" 
                  placeholder="••••••••" 
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                <small v-if="updatePasswordError.newPassword.length > 0" class="form-text invalid-feedback">{{updatePasswordError.newPassword.join(",")}}</small>

                <!-- <Password v-model="updatePasswordData.newPassword" placeholder="New Password" aria-label="new password" :invalid="updatePasswordError.newPassword.length > 0" />
                <Message v-if="updatePasswordError.newPassword.length > 0" severity="error">{{updatePasswordError.newPassword.join(",")}}</Message> -->
              </div>
              <div class="flex flex-col gap-2">
                <div>Confirm Password</div>
                <input
                   v-model="updatePasswordData.newPassword_confirm"
                  type="password" 
                  name="confirm_password" 
                  id="confirm_password" 
                  placeholder="••••••••" 
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                <small v-if="updatePasswordError.newPassword_confirm.length > 0" class="form-text invalid-feedback">{{updatePasswordError.newPassword_confirm.join(",")}}</small>

                <!-- <Password v-model="updatePasswordData.newPassword_confirm" placeholder="New Password Confirmation" aria-label="new password confirmation" :invalid="updatePasswordError.newPassword_confirm.length > 0" :feedback="false" />
                <Message v-if="updatePasswordError.newPassword_confirm.length > 0" severity="error">{{updatePasswordError.newPassword_confirm.join(",")}}</Message> -->
              </div>
            </main>
            <footer class="flex w-full justify-end px-6">
                <div class="flex ">
                    <button class="py-2 px-6 bg-sky-400 rounded-lg text-white mb-7 mr-2"
                        type="submit"
                    > Submit </button>
                </div>
                <div class="flex">
                    <button id="modal-close" class="py-2 px-6 bg-red-primary rounded-lg text-white mb-7"
                        @click="onToggle(false)"
                    > Cancel </button>
                </div>
            </footer>
        </div>
      </form>
    </div>
</template>

<script setup>
import {reactive} from 'vue';
import { handleError } from '@/utilize/HandleError';
import { useAuthStore } from '@/stores/AuthStore';
import instanceAxios from '@/utilize/InstanceAxios'
import { handleSuccess } from '@/utilize/HandleSuccess';

const authStore = useAuthStore()

  const updatePasswordError = reactive({
    currentPassword: [],
    newPassword: [],
    newPassword_confirm:[]
  })

  const updatePasswordData = reactive({
    currentPassword: "",
    newPassword: "",
    newPassword_confirm:""
  })

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

  const checkValidty = () => {
    resetErrorState()
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
    let checkUpercaseLowerCase = false
    // check current password
    if (!updatePasswordData.currentPassword) {
      updatePasswordError.currentPassword.push("Current Password Is Required")
    }
    if (!updatePasswordData.newPassword) {
      updatePasswordError.newPassword.push("New Password Is Required")
    }
    if (updatePasswordData.newPassword !== updatePasswordData.newPassword_confirm) {
      updatePasswordError.newPassword_confirm.push("New Password Confirmation is not equal with New Password")
    } 
    if(updatePasswordData.newPassword && (!regex.test(updatePasswordData.newPassword) || !regex.test(updatePasswordData.newPassword_confirm)) ){
      updatePasswordError.newPassword_confirm.push("The new password field must contain at least one uppercase and one lowercase letter.")
      updatePasswordError.newPassword.push("The new password field must contain at least one uppercase and one lowercase letter.")
      checkUpercaseLowerCase = true
    }

    return updatePasswordData.currentPassword.length < 1 &&
        updatePasswordData.newPassword.length < 1 &&
        updatePasswordData.newPassword_confirm.length < 1 ||
        checkUpercaseLowerCase
  }

  const resetErrorState = () => {
    updatePasswordError.currentPassword = []
    updatePasswordError.newPassword = []
    updatePasswordError.newPassword_confirm = []
  }

    const resetState = () =>{
      updatePasswordData.currentPassword = ""
      updatePasswordData.newPassword = ""
      updatePasswordData.newPassword_confirm = ""

      resetErrorState()
    }
  
  function generateError(error) {
    const errorMessage = error?.response?.data?.errors
    let getMessage = ''
    for (let x in errorMessage) {
      return getMessage = errorMessage[x]
    }
    const payloadError = {
      status: true,
      message: getMessage
    }

    return payloadError
  }

  function onToggle(data) {
    const result = checkValidty()
    const payloadModal = {
        name: props.nameModal,
        value: data
    }
    if(data){
        if(!result){
          // todo: send payload to API
            const payload = {
                current_password: updatePasswordData.currentPassword,
                new_password: updatePasswordData.newPassword,
                new_password_confirmation: updatePasswordData.newPassword_confirm
            }

            // authStore.passwordUpdate(payload)

            instanceAxios.put(`common/v1/auth/password`, payload)
              .then((response) => {

                const payload = {
                  status: true,
                  message: 'update_password'
                }
                authStore.updatePasswordResponse = payload
                handleSuccess.successMessage('Successfull update password')
                resetState()
                emit('isOpenModelCloseGeneral', payloadModal)   
              })
              .catch((error) => {
                const messageError = generateError(error)
                handleError.errorMessage(messageError)
                resetState()
              })

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