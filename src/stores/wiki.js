import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

import { RoutesMap } from '@/router'
import { getArticles, getLists, ErrorsMap } from '@/api'

export const useWikiStore = defineStore('wiki', () => {
  const router = useRouter()

  const lists = ref([])
  const articles = ref([])
  const selectedList = ref(null)

  const selectedListName = computed(
    () => lists.value.find((l) => l.id === selectedList.value)?.name,
  )

  const loadLists = () => {
    const callbacks = getLists()
    callbacks.on('lists', (newLists) => lists.value.push(...newLists))

    callbacks.on('error', (err) => {
      if (err === ErrorsMap.unauthorized) {
        router.push({ name: RoutesMap.login })
      }
    })
  }

  const selectList = async (listId) => {
    selectedList.value = listId
    router.push({ name: RoutesMap.list })

    const loadedArticles = await getArticles(listId)
    articles.value = loadedArticles
  }

  const deselectList = () => {
    selectedList.value = null
    articles.value = []

    router.back()
  }

  return {
    articles,
    deselectList,
    lists,
    loadLists,
    selectList,
    selectedList,
    selectedListName,
  }
})
