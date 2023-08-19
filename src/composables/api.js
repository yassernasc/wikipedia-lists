import { storeToRefs } from 'pinia'
import wretch from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'
import { useAuthStore } from '@/stores'

const baseUrl = 'https://en.wikipedia.org/api/rest_v1/data/lists'
const wikiApi = wretch(baseUrl)
  .addon(QueryStringAddon)
  .resolve((r) => r.json())

export const useApi = () => {
  const auth = useAuthStore()
  const { cookie, token } = storeToRefs(auth)

  const byCookie = wikiApi.headers({ Cookie: cookie })
  const byToken = wikiApi.query({ csrf_token: token })

  const getLists = async (next = '""') => {
    const { lists, next: newNext } = await byCookie.query({ next }).get('/')

    if (newNext) {
      lists.push(...(await getLists(newNext)))
    }

    return lists
  }

  const getArticles = async (listId) => {
    const { entries } = await byCookie.get(`/${listId}/entries/`)
    return entries
  }

  return { getLists, getArticles }
}

/*
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
*/
