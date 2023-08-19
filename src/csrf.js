import wretch from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'
import { unauthenticated } from '@/errors'

export const getToken = async () => {
  const endpoint = 'https://en.wikipedia.org/w/api.php'

  const res = await wretch(endpoint)
    .addon(QueryStringAddon)
    .query({ action: 'query', format: 'json', formatversion: '2', meta: 'tokens', type: 'csrf' })
    .get()
    .json()

  const token = res.query.tokens.csrftoken

  if (token === '+\\') {
    throw unauthenticated
  }

  return token
}
