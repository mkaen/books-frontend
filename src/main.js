import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router"
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createPinia } from 'pinia'
import BaseCard from '@/components/ui/BaseCard.vue'


const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.component('base-card', BaseCard);

app.mount('#app')
