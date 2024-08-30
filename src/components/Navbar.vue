<template>
    <!-- ********* trigger loading   -->
     <Teleport
        id="ModalEvent" 
        class="z-40"
        to="body"
        v-if="getLoading"
     >
            <Loading></Loading>
     </Teleport>
    <div id="Navbar">
        <transition name="fade">
            <div class="w-screen flex justify-center title text-center pb-3 pt-4 mb-8 px-3 z-20 fixed bg-sky-400 shadow-lg">
                <div class="lg:w-64 ml-10">

                </div>
                <div class=" w-full flex justify-between">
                    <div class="w-1/2 flex justify-start">
                        <button
                            @click="sidebarOpen(getIsSidebarOpen)"  
                            class="py-2 focus:outline-none focus:bg-gray-600 md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"
                                stroke="gray">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h3 class="lg:text-4xl md:text-4xl text-xl text-white font-bold py-5 hidden lg:inline">
                            <span
                                class=" cursor-pointer" 
                                @click="goBack()">
                                App Todo List
                            </span> 
                        </h3>
                    </div>
                    <div class="w-1/2 flex justify-end items-center">
                        <div class="flex item-center mr-6">
                            <div class="w-12 h-12 rounded-full relative">
                                <button class="cursor-pointer"
                                    @click="isOptionsExpanded = !isOptionsExpanded"
                                    @blur="isOptionsExpanded = false"
                                >
                                    <img class="w-12 h-12" :src="getProfile?.profile_image" alt="user">
                                </button>
                                <transition
                                    enter-active-class="transform transition duration-500 ease-custom"
                                    enter-class="-translate-y-1/2 scale-y-0 opacity-0"
                                    enter-to-class="translate-y-0 scale-y-100 opacity-100"
                                    leave-active-class="transform transition duration-300 ease-custom"
                                    leave-class="translate-y-0 scale-y-100 opacity-100"
                                    leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
                                >
                                    <ul
                                        v-show="isOptionsExpanded"
                                        class="absolute left-0 right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden w-48"
                                    >    
                                        <li class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200 text-left">
                                            Hello {{getProfile?.name}} 
                                        </li>
                                        <li 
                                            class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200 text-left cursor-pointer"
                                            @click="goToProfile()"
                                        >
                                            Go To Profile
                                        </li>
                                    </ul>
                                </transition>
                            </div>
                        </div>
                        <div class="flex justify-center align-center md:px-6 lg:px-6 px-4 py-2 rounded-full bg-white text-sm text-white cursor-pointer lg:mr-6 mr-2 " 
                             @click="logout()"
                        >
                            <h3 class="lg:text-xl md:text-2xl text-xl text-sky-400 font-bold">
                                Logout
                            </h3>
                        </div>
                    </div>  
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onBeforeMount, Teleport } from 'vue';
import { useSidebarControlStore } from '@/stores/Sidebar';
import { useRouter } from 'vue-router';
import { utilize } from '@/utilize/index';
import { HandleError } from '@/utilize/HandleError';
import { useAuthStore } from '@/stores/AuthStore';
import Loading from '@/components/Loading.vue';

import Swal from 'sweetalert2';

const sidebarControlStore = useSidebarControlStore()
const authStore = useAuthStore()
const router = useRouter();

const isOptionsExpanded = ref(false);
const isSidebarOpen = ref(false);

const nameRoutePath = ref('');

const getIsSidebarOpen = computed(()=>{
    return sidebarControlStore.getterOpen;
})

const getLogoutResponse = computed(()=>{
    return authStore.logoutResponse;
})

const getLoading = computed(()=>{
    return authStore.loading;
})

const getProfile =computed(()=>{
    return authStore.profileResponse
})

onBeforeMount(()=>{
    const paramsRoute = router.currentRoute.value.name;
    nameRoutePath.value = paramsRoute
})

onMounted(()=>{
    authStore.profile();
})

watch(getIsSidebarOpen, (newValue, oldValue)=>{
  if(newValue){
    console.log("open navbar =", newValue)
    isSidebarOpen.value = newValue
  }
})

function sidebarOpen (data){
    isSidebarOpen.value = data;
    isSidebarOpen.value = !isSidebarOpen.value
    sidebarControlStore.sidebarIsOpen(isSidebarOpen.value)
}

watch(getLogoutResponse, (newValue, oldValue) => {
    if(newValue?.status === 200 && newValue?.data?.response_message.toLowerCase() === 'ok'){
        Swal.fire({
            icon: "success",
            title: "Success Logout",
            text: "You will redirect to login",
            confirmButtonColor: '#38bdf8',
            confirmButtonText: "Yes",
        }).then((result)=>{
            if (result.isConfirmed || result.isDismissed) {
                authStore.logoutResponse = null
                authStore.loading = false;
                
                router.push('/login')
            }
        })
    } else if(newValue?.status === 401){
        authStore.loginResponse = null
        authStore.loading = false;
        errorHandle.errorMessage(newValue?.data?.message)
    } else {
        return
    }
})

function logout(){
    Swal.fire({
        icon: "warning",
        title: "Are you sure want Logout ? ",
        showCancelButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: '#38bdf8',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            authStore.logout()
        } else{
            return false;
        }
    });
}

function goBack(){
    router.push('/')
}

function goToProfile(){
    console.log("go to profile = ")
    router.push('/profile')
}

</script>

<style scoped>
.v-leave-active {
  transition: opacity 3s ease;
}

</style>