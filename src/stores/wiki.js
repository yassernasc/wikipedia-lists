import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

import { RoutesMap } from '@/router'
import { useApi } from '@/composables'

export const useWikiStore = defineStore('wiki', () => {
  const router = useRouter()
  const api = useApi()

  const lists = ref([])
  const articles = ref([])
  const selectedList = ref(null)

  const selectedListName = computed(
    () => lists.value.find((l) => l.id === selectedList.value)?.name,
  )

  const loadLists = async () => {
    lists.value = await api.getLists()
    router.push({ name: RoutesMap.home })
  }

  const selectList = async (listId) => {
    selectedList.value = listId
    router.push({ name: RoutesMap.list })

    articles.value = await api.getArticles(listId)
  }

  const deselectList = () => {
    selectedList.value = null
    articles.value = []

    router.push({ name: RoutesMap.home })
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
