<template>
    <div 
        ref="sidebarTemplate" 
        :class="isSidebarOpen ? 'absolute z-30 bg-neutral-200 h-full top-0 left-0':'hidden'"
    >
        <nav class="space-y-2 w-64 h-full">
            <div class="bg-neutral-500 pb-3 pt-8 mb-8 px-3">
                <h3 class="lg:text-2xl text-xl text-white text-center font-bold py-6 inline">
                    <span
                        class=" cursor-pointer" 
                        @click="goBack()">
                        Your App
                    </span> 
                </h3>
            </div>
            <a href="/dashboard" class="py-3 px-4 flex items-center hover:text-gray-400  ">
                <div class="flex px-3 py-1.5 rounded-xl w-full" :class="[activeLink === 'dashboard'?'bg-neutral-400 text-white':''] " >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                </div>
            </a>
            <!-- heading -->
            <a href="/coupoun" class="flex py-3 px-4 hover:text-gray-400" >
                <div class="flex px-3 py-1.5 rounded-xl w-full" :class="[activeLink === 'coupoun'?'bg-neutral-400 text-white':''] ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Coupoun
                </div>
            </a>
            <!-- heading -->
            <a href="/order" class="flex py-3 px-4 hover:text-gray-400">
                <div class="flex px-3 py-1.5 rounded-xl w-full" :class="[activeLink === 'order'?'bg-neutral-400 text-white':''] ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-code h-5 w-5 mr-3" viewBox="0 0 16 16">
                        <path d="M6.646 5.646a.5.5 0 1 1 .708.708L5.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zm2.708 0a.5.5 0 1 0-.708.708L10.293 8 8.646 9.646a.5.5 0 0 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2z"/>
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
                    </svg>
                    Order
                </div>
            </a>
            <a href="/profile" class="flex py-3 px-4 hover:text-gray-400">
                <div class="flex px-3 py-1.5 rounded-xl w-full" :class="[activeLink === 'profile'?'bg-neutral-400 text-white':''] ">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
                    <div class="pl-2">
                        Profile
                    </div>
                </div>
            </a>
        </nav>
    </div>
    <div
        id="modal-bg" 
        @click="closeModal(getIsSidebarOpen)"
        :class="isSidebarOpen ? 'w-full h-full z-20 fixed top-0 right-0 blur-background lg:hidden':''"
    >
    </div>
</template>

<script setup>
import { ref, watch, onMounted, onUpdated, onBeforeMount, computed} from 'vue';
import { useSidebarControlStore } from '@/stores/Sidebar';
import { useRouter } from 'vue-router';

const router = useRouter();
const sidebarControlStore = useSidebarControlStore()

let windowWidth = ref(window.innerWidth);

const isSidebarOpen = ref(true);
const sidebarTemplate = ref(null)

const getIsSidebarOpen = computed(()=>{
    return sidebarControlStore.getterOpen;
})

const activeLink = computed(()=>{
    if(router.currentRoute.value.path.includes('/dashboard')){
        return 'dashboard'
    } else if(router.currentRoute.value.path.includes('/coupoun')){
        return 'coupoun'
    } else if(router.currentRoute.value.path.includes('/order')){
        return 'order'
    } else if(router.currentRoute.value.path.includes('/profile')){
        return 'profile'
    }
})

watch(getIsSidebarOpen, (newValue, oldValue)=>{
  if(newValue){
    isSidebarOpen.value = newValue
  }
})

watch(windowWidth, (newValue, oldValue)=>{
  if (newValue >= 576) {
        isSidebarOpen.value = true
        sidebarControlStore.sidebarIsOpen(true)
      } else {
        isSidebarOpen.value = false
        sidebarControlStore.sidebarIsOpen(false)
      }
})

onMounted(()=>{
  window.addEventListener('resize', onResize)
})

onUpdated(()=>{
  window.addEventListener('resize', onResize)
})


function onResize() {
      windowWidth.value = window.innerWidth

      if (windowWidth.value >= 576) {
        isSidebarOpen.value = true
        sidebarControlStore.sidebarIsOpen(true)
      } else {
        isSidebarOpen.value = false
        sidebarControlStore.sidebarIsOpen(false)
      }
}

const closeModal = (data) =>{
    isSidebarOpen.value = data;
    isSidebarOpen.value = !isSidebarOpen.value
    sidebarControlStore.sidebarIsOpen(isSidebarOpen.value)
}

function goBack(){
    router.push('/')
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