<template>
  <div id="app w-full">
    <div
      class="flex flex-col justify-center"
    >
      <template v-if="nameRoutePath !== 'login'">
        <Navbar></Navbar>
      </template>
      <section class="bg-gray-50 dark:bg-gray-900 flex flex-row h-screen">
        <template v-if="nameRoutePath !== 'login'">
          <Sidebar></Sidebar>
          <div class="w-full flex mt-[8rem] lg:mt-[10rem] relative justify-center relative overflow-x-hidden  overflow-y-auto">
            <div class="lg:w-64 lg:ml-10 ">
            </div>
            <RouterView />
          </div>
        </template>
        <template v-if="nameRoutePath === 'login'">
          <RouterView />
        </template>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUpdated, onBeforeMount, computed} from 'vue';
import Navbar from '../src/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import { useSidebarControlStore } from '@/stores/Sidebar';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';

const authStore = useAuthStore()
const router = useRouter();
const nameRoutePath = ref(router.currentRoute.value);

const checkAutoLogout = computed(()=>{
  return authStore.checkUserExpired()
})

watch(() => router.currentRoute.value, fetchData, { immediate: true })

async function fetchData(data) {
    nameRoutePath.value = data.name;
}

watch(checkAutoLogout, (newValue, oldValue)=>{
  if(newValue){
    authStore.autoLogout();
  }
})

onBeforeMount(()=>{
  authStore.autoLogout()
})

onMounted(()=>{
  authStore.autoLogout()
})

</script>

<style scoped>

</style>
