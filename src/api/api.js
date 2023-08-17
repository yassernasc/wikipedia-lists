import wretch from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'
import mitt from 'mitt'

import { ErrorsMap } from '.'
import getCookies from './cookies'

const baseUrl = 'https://en.wikipedia.org/api/rest_v1/data/lists'

export const getLists = () => {
  const emitter = mitt()
  _getLists({ emitter })
  return emitter
}

const _getLists = async ({ emitter, next = '""', cookies = null }) => {
  const endpoint = `${baseUrl}/`
  const w = wretch(endpoint).addon(QueryStringAddon)

  const close = (emitter) => emitter.all.clear()

  const onResponse = ({ lists, next }) => {
    emitter.emit('lists', lists)

    if (next) {
      _getLists({ emitter, next, cookies })
    } else {
      close(emitter)
    }
  }

  // setTimeout(() => onResponse({ lists: hardcodedLists }))

  const onError = (errorType) => {
    emitter.emit('error', errorType)
    close(emitter)
  }

  if (cookies === null) {
    cookies = await getCookies()
  }

  if (cookies) {
    w.query({ next })
      .headers({ Cookie: cookies })
      .get()
      .unauthorized(() => onError(ErrorsMap.unauthorized))
      .json(onResponse)
      .catch(() => onError(ErrorsMap.unknown))
  } else {
    onError(ErrorsMap.unauthorized)
  }
}

export const getArticles = async (listId) => {
  // return hardcodedArticles

  const endpoint = `${baseUrl}/${listId}/entries/`
  const w = wretch(endpoint)
    .headers({ Cookie: await getCookies() })
    .resolve((r) => r.json())

  const { entries: articles } = await w.get()
  return articles
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
