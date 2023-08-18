import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

import Card from '@/components/Card.vue'
import Header from '@/components/Header.vue'
import List from '@/components/List.vue'
import Menu from '@/components/Menu.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app
  .component('Card', Card)
  .component('Header', Header)
  .component('List', List)
  .component('Menu', Menu)

app.mount('#app')
