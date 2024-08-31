import './index.css'
import '@/assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Lara from '@/presets/lara';  

import 'material-symbols';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia());
app.use(PrimeVue, {
    unstyled: true,
    pt: Lara    
});
app.use(router)

app.mount('#app')
