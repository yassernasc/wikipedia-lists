import { createRouter, createMemoryHistory } from 'vue-router'
import InitialPage from '@/views/InitialPage.vue'
import HomePage from '@/views/HomePage.vue'
import ListPage from '@/views/ListPage.vue'
import LoginPage from '@/views/LoginPage.vue'

export const RoutesMap = { initial: 'initial', home: 'home', list: 'list', login: 'login' }

export default createRouter({
  history: createMemoryHistory(),
  routes: [
    { name: RoutesMap.initial, component: InitialPage },
    { name: RoutesMap.home, component: HomePage },
    { name: RoutesMap.list, component: ListPage },
    { name: RoutesMap.login, component: LoginPage },
  ],
})
