import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './routes/router';

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app');