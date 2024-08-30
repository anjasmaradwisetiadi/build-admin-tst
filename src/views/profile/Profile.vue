<template>
    <div class="flex justify-center min-h-screen px-2 w-full">
      <div class="relative overflow-x-hidden z-1 container max-w-7xl mx-auto p-4">
        <!-- Header Image -->
        <div
          class="relative bg-cover bg-center rounded-lg overflow-hidden z-0 relative"
        >
          <img class="image-profile" src="@/assets/image/bg-profile.jpeg" />
        </div>
        <div class="px-3 -mt-10 flex flex-wrap">
          <div
            class="flex flex-row flex-wrap bg-white p-2 lg:p-8 rounded-lg shadow-lg flex z-10 relative"
          >
            <!-- User Profile Section -->
            <div class="lg:w-1/2 w-full mt-4">
              <div class="flex items-center">
                <img
                  :src="getProfile?.profile_image"
                  class="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                />
                <div class="ml-4">
                  <h2 class="text-xl font-bold">{{ getProfile?.name }}</h2>
                  <p class="text-gray-500">{{ getProfile?.role_name }}</p>
                </div>
              </div>
  
              <!-- User Profile Details -->
              <div class="mt-6">
                <h3 class="text-lg font-semibold text-gray-700">User Profile</h3>
                <p class="text-gray-500">
                  <span class="font-semibold">Id:</span>
                  {{ getProfile?.role_code }}
                </p>
                <p class="text-gray-500">
                  <span class="font-semibold">Name:</span> {{ getProfile?.name }}
                </p>
                <p class="text-gray-500">
                  <span class="font-semibold">Mobile:</span>
                  {{ getProfile?.phone }}
                </p>
              </div>
            </div>
  
            <!-- Profile Information -->
            <div class="lg:w-1/2 w-full mt-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-700">
                  Profile Information
                </h3>
                <p class="text-gray-500 mt-2">
                  Hi, I'm {{ getProfile?.name }} Decisions: If you can't decide,
                  the answer is no. If two equally difficult paths, choose the one
                  more painful in the short term (pain avoidance is creating an
                  illusion of equality).
                </p>
                <div class="mt-4">
                  <p class="text-gray-500">
                    <span class="font-semibold">Full Name:</span>
                    {{ getProfile?.name }}
                  </p>
                  <p class="text-gray-500">
                    <span class="font-semibold">Mobile:</span>
                    {{ getProfile?.phone }}
                  </p>
                  <p class="text-gray-500">
                    <span class="font-semibold">Social:</span>
                  </p>
                  <div class="flex mt-3">
                        <div class="flex ">
                            <button id="modal-close" class="py-2 px-6 bg-sky-400 rounded-lg text-white mb-7 mr-2"
                                @click="updateProfile()"
                            > Update Profile </button>
                        </div>
                        <div class="flex ">
                            <button id="modal-close" class="py-2 px-6 bg-sky-400 rounded-lg text-white mb-7 mr-2"
                                @click="updatePassword()"
                            > Update Password </button>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Main Content -->
      </div>
    </div>

    <!-- it need loading and alert 2 different -->
    <!-- <LoadingAndAlert
        :loading="getLoading"
        :responseSwalError="getError"
        :responseSwalSuccess="getSuccess"
    >
    </LoadingAndAlert> -->

    <!-- it need loading and alert 2 different -->
    <!-- <LoadingAndAlert
        :loading="getLoading"
        :responseSwalError="getError"
        :responseSwalSuccess="getSuccess"
    >
    </LoadingAndAlert> -->

    <ModalUpdateProfile
        :isOpenModal="getIsOpenModalGlobal"
        :nameModal="getNameModal" 
        @isOpenModelCloseGeneral="isOpenModelCloseServer"
        :responseModal="getResponseModalGlobal" 
    >

    </ModalUpdateProfile>

    <ModalUpdatePassword
        :isOpenModal="getIsOpenModalGlobal"
        :nameModal="getNameModal" 
        @isOpenModelCloseGeneral="isOpenModelCloseServer"
        :responseModal="getResponseModalGlobal" 
    >

    </ModalUpdatePassword>
  </template>
  
  <script setup>
  import { ref, watch, computed, onMounted, onBeforeMount, Teleport } from 'vue';
  import ModalUpdateProfile from './ModalUpdateProfile.vue';
  import ModalUpdatePassword from './ModalUpdatePassword.vue'
  import { useAuthStore } from '@/stores/AuthStore';
  import { useFormDataModalStore } from '@/stores/FormDataModalStore';
  
  const authStore = useAuthStore()
  const formDataModalStore = useFormDataModalStore()

  onMounted(()=>{
      authStore.profile();
  })
  
  const getLoading = computed(()=>{
      return authStore.loading;
  })
  
  const getProfile = computed(()=>{
      return authStore.profileResponse
  })

  //********** */ form modal data trigger response 
    const getIsOpenModalGlobal = computed(()=>{
        return formDataModalStore.isOpenModalGlobal
    })
    const getNameModal = computed(()=>{
        return formDataModalStore.nameModal
    })
    const getResponseModalGlobal = computed(()=>{
        return formDataModalStore.responseModalGlobal
    })


  const updateProfile = () => {
    const isOpenModalGlobal = true;
    const nameModal ='update_profile';
    const responseModalGlobal = {
        title: 'Update Profile',
        message: ''
    }

    const payload = {
        'isOpenModalGlobal': isOpenModalGlobal,
        'nameModal': nameModal,
        'responseModalGlobal': responseModalGlobal
    }
    formDataModalStore.onActivatedModal(payload)
 }

 const updatePassword = () => {
    const isOpenModalGlobal = true;
    const nameModal ='update_password';
    const responseModalGlobal = {
        title: 'Update Password',
        message: ''
    }

    const payload = {
        'isOpenModalGlobal': isOpenModalGlobal,
        'nameModal': nameModal,
        'responseModalGlobal': responseModalGlobal
    }
    formDataModalStore.onActivatedModal(payload)
 }

 const isOpenModelCloseServer = (event) =>{
    formDataModalStore.onDeactivatedModal()
 }
    
  </script>
  
  <style scoped>
  .page-not-found {
    position: relative;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    display: flex;
  }
  
  .image-profile {
    width: 100%;
    height: 200px;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
  }
  </style>
  