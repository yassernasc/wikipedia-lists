import { computed } from 'vue'
import wretch from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'
import { useAuthStore } from '@/stores'

const baseUrl = 'https://en.wikipedia.org/api/rest_v1/data/lists'
const wikiApi = wretch(baseUrl)
  .addon(QueryStringAddon)
  .resolve((r) => r?.json())

export const useApi = () => {
  const auth = useAuthStore()

  // const byCookie = computed(() => wikiApi.headers({ Cookie: auth.cookie }))
  const byToken = computed(() => wikiApi.query({ csrf_token: auth.token }))

  const getLists = async (next = '""') => {
    // return hardcodedLists
    const { lists, next: newNext } = await wikiApi.query({ next }).get('/')

    if (newNext) {
      const newLists = await getLists(newNext)
      lists.push(...newLists)
    }

    return lists
  }

  const getArticles = async (listId) => {
    // return hardcodedArticles
    const { entries } = await wikiApi.get(`/${listId}/entries/`)
    return entries
  }

  const createList = async (form) => {
    const { list } = await byToken.value.post(form, '/')
    return list
  }

  const updateList = async ({ id, form }) => {
    const { list } = await byToken.value.put(form, `/${id}`)
    return list
  }

  const deleteList = (listId) => byToken.value.delete(`/${listId}`)

  const deleteArticle = ({ listId, articleId }) =>
    byToken.value.delete(`/${listId}/entries/${articleId}`)

  return {
    createList,
    deleteArticle,
    deleteList,
    getArticles,
    getLists,
    updateList,
    updateList,
  }
}

const hardcodedLists = [
  {
    id: 3648265,
    name: 'Protocols',
  },
  {
    id: 3648263,
    name: 'Data',
  },
  {
    id: 3648261,
    name: 'Books',
  },
  {
    id: 3659650,
    name: 'Cyberpunk',
  },
]

const hardcodedArticles = [
  {
    id: 58181039,
    project: 'https://en.wikipedia.org',
    title: 'Freedesktop.org',
  },
  {
    id: 58180147,
    project: 'https://en.wikipedia.org',
    title: 'GNU Hurd',
  },
  {
    id: 52200247,
    project: 'https://en.wikipedia.org',
    title: 'Comparison of operating system kernels',
  },
  {
    id: 52200246,
    project: 'https://en.wikipedia.org',
    title: 'List of GNU Core Utilities commands',
  },
  {
    id: 52200245,
    project: 'https://en.wikipedia.org',
    title: 'List of terminal emulators',
  },
]
