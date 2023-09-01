import { computed } from 'vue'
import wretch from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'
import { useAuthStore } from '@/stores'
import { usePanic } from '@/composables'

const baseUrl = 'https://en.wikipedia.org/api/rest_v1/data/lists'
const wikiApi = wretch(baseUrl)
  .addon(QueryStringAddon)
  .resolve((r) => r?.json())

export const useApi = () => {
  const auth = useAuthStore()
  const panic = usePanic()

  const onError = (err) => {
    panic.ohShit(err)
    throw err
  }

  const byToken = computed(() => wikiApi.query({ csrf_token: auth.token }))

  const setup = () => byToken.value.post({}, '/setup').catch()

  const getLists = async (firstTry = true) => {
    try {
      return await _getLists()
    } catch (err) {
      if (firstTry && err.status === 400) {
        await setup() // enable reading lists feature
        return await getLists(false)
      } else {
        onError(err)
      }
    }
  }

  const _getLists = async (next = '""') => {
    // return hardcodedLists
    const { lists, next: newNext } = await wikiApi.query({ next }).get('/')

    if (newNext) {
      const newLists = await _getLists(newNext)
      lists.push(...newLists)
    }

    return lists
  }

  const getArticles = async (listId) => {
    // return hardcodedArticles
    try {
      const { entries } = await wikiApi.get(`/${listId}/entries/`)
      return entries
    } catch (err) {
      onError(err)
    }
  }

  const createList = async (form) => {
    try {
      const { list } = await byToken.value.post(form, '/')
      return list
    } catch (err) {
      onError(err)
    }
  }

  const updateList = async ({ id, form }) => {
    try {
      const { list } = await byToken.value.put(form, `/${id}`)
      return list
    } catch (err) {
      onError(err)
    }
  }

  const deleteList = (listId) => {
    try {
      byToken.value.delete(`/${listId}`)
    } catch (err) {
      onError(err)
    }
  }

  const deleteArticle = ({ listId, articleId }) => {
    try {
      byToken.value.delete(`/${listId}/entries/${articleId}`)
    } catch (err) {
      onError(err)
    }
  }

  const addArticle = async ({ listId, data }) => {
    try {
      const { entry } = await byToken.value.post(data, `/${listId}/entries/`)
      return entry
    } catch (err) {
      onError(err)
    }
  }

  return {
    addArticle,
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
