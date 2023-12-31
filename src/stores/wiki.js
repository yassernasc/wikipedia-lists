import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

import { RoutesMap } from '@/router'
import { useApi } from '@/composables'
import { getCurrentTabUrl } from '@/extension'

export const useWikiStore = defineStore('wiki', () => {
  const router = useRouter()
  const api = useApi()

  const lists = ref([])
  const articles = ref([])
  const selectedList = ref(null)

  const selectedListName = computed(
    () => lists.value.find((l) => l.id === selectedList.value)?.name,
  )

  const sortedLists = computed(() =>
    lists.value.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)),
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

  const moveArticle = ({ currentListId, newListId, articleId }) => {
    const { project, title } = articles.value.find((a) => a.id === articleId)
    const data = { project, title }

    addArticle({ listId: newListId, data })
    deleteArticle({ listId: currentListId, articleId })
  }

  const addArticle = ({ listId, data }) => api.addArticle({ listId, data })

  const addCurrentUrl = async () => {
    const formatTitle = (title) => decodeURIComponent(title).replaceAll('_', ' ')

    const url = await getCurrentTabUrl()
    const [project, title] = url.split('/wiki/')
    const data = { project, title: formatTitle(title) }

    const newArticle = await addArticle({ listId: selectedList.value, data })
    articles.value.unshift(newArticle)
  }

  return {
    addArticle,
    addCurrentUrl,
    articles,
    createList,
    deleteArticle,
    deleteList,
    deselectList,
    lists,
    loadLists,
    moveArticle,
    reloadLists,
    selectList,
    selectedList,
    selectedListName,
    sortedLists,
    updateList,
  }
})
