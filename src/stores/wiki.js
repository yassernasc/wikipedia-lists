import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

import { RoutesMap } from '@/router'
import { getLists, ErrorsMap } from '@/api'

export const useWikiStore = defineStore('wiki', () => {
  const router = useRouter()

  const lists = ref([])
  const selectedList = ref(null)

  const loadLists = () => {
    const callbacks = getLists()
    callbacks.on('lists', (newLists) => lists.value.push(...newLists))

    callbacks.on('error', (err) => {
      const route = router.currentRoute.value.name

      if (err === ErrorsMap.unauthorized && route !== RoutesMap.login) {
        router.push({ name: 'login' })
      }
    })
  }

  return { lists, selectedList, loadLists }
})
