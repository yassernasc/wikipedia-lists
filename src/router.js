import { createRouter, createMemoryHistory } from 'vue-router'
import InitialPage from '@/views/InitialPage.vue'
import HomePage from '@/views/HomePage.vue'
import ListPage from '@/views/ListPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import PanicPage from '@/views/PanicPage.vue'

export const RoutesMap = {
  initial: 'initial',
  home: 'home',
  list: 'list',
  login: 'login',
  panic: 'panic',
}

export default createRouter({
  history: createMemoryHistory(),
  routes: [
    { name: RoutesMap.initial, component: InitialPage },
    { name: RoutesMap.home, component: HomePage },
    { name: RoutesMap.list, component: ListPage },
    { name: RoutesMap.login, component: LoginPage },
    { name: RoutesMap.panic, component: PanicPage },
  ],
})
