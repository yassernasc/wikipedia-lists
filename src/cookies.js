import { loadCookies } from '@/extension'
import { unauthenticated } from '@/errors'

export const getCookies = async () => {
  const cookies = await loadCookies()

  const required = ['centralauth_User', 'ss0-centralauth_Session']
  const requiredCookies = cookies
    .filter((c) => required.includes(c.name))
    .map((c) => [c.name, c.value])

  if (requiredCookies.length !== required.length) {
    throw unauthenticated
  }

  return toCookieString(requiredCookies)
}

const toCookieString = (cookies) => cookies.map((c) => c.join('=')).join(';')
