import wretch from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'
import mitt from 'mitt'

import { ErrorsMap } from '.'
import getCookies from './cookies'

const url = 'https://en.wikipedia.org/api/rest_v1/data/lists/'
const w = wretch(url).addon(QueryStringAddon)

export const getLists = () => {
  const emitter = mitt()
  _getLists({ emitter })
  return emitter
}

const _getLists = async ({ emitter, next = '""', cookies = null }) => {
  const onResponse = ({ lists, next }) => {
    emitter.emit('lists', lists)

    if (next) {
      _getLists({ emitter, next, cookies })
    } else {
      close(emitter)
    }
  }

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

const close = (emitter) => emitter.all.clear()
