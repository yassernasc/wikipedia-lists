import { createRouter, createMemoryHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import ListPage from '@/views/ListPage.vue'

export const RoutesMap = { home: 'home', list: 'list', login: 'login' }

export default createRouter({
  history: createMemoryHistory(),
  routes: [
    { name: RoutesMap.home, component: HomePage },
    { name: RoutesMap.list, component: ListPage },
    { name: RoutesMap.login, component: LoginPage },
  ],
})
