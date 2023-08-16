import { createRouter, createMemoryHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Loading from '@/views/Loading.vue'
import Login from '@/views/Login.vue'

export const RoutesMap = { home: 'home', loading: 'loading', login: 'login' }

export default createRouter({
  history: createMemoryHistory(),
  routes: [
    { name: 'home', component: Home },
    { name: 'loading', component: Loading },
    { name: 'login', component: Login },
  ],
})
