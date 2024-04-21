// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './components/router'
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App)
.use(ElementPlus)
.use(router)
.use(pinia)
.mount('#app')
