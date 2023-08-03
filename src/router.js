import { createRouter, createMemoryHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

export default createRouter({
  history: createMemoryHistory(),
  routes: [
    { name: 'home', component: HomeView },
    { name: 'about', component: AboutView },
  ],
})
