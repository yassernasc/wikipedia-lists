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

  const reloadLists = async () => {
    lists.value = []
    lists.value = await api.getLists()
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

  const createList = async (form) => {
    const newList = await api.createList(form)
    lists.value.unshift(newList)
  }

  const updateList = ({ id, form }) => {
    lists.value.find((l) => l.id === id).name = form.name

    api.updateList({ id, form })
  }

  const deleteList = (listId) => {
    const index = lists.value.findIndex((l) => l.id === listId)
    lists.value.splice(index, 1)

    api.deleteList(listId)
  }

  const deleteArticle = ({ listId, articleId }) => {
    const index = articles.value.findIndex((a) => a.id === articleId)
    articles.value.splice(index, 1)

    api.deleteArticle({ listId, articleId })
  }

  return {
    articles,
    createList,
    deleteList,
    deselectList,
    lists,
    loadLists,
    reloadLists,
    selectList,
    selectedList,
    selectedListName,
    updateList,
    deleteArticle,
  }
})
