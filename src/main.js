import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

import List from '@/components/List.vue'
import Header from '@/components/Header.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('Header', Header).component('List', List)

app.mount('#app')
