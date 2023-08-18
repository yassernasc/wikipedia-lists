import { getCookies } from '@/extension'

let cookieCache = null

export default async () => {
  if (cookieCache) {
    return cookieCache
  }

  const cookies = await getCookies()

  const required = ['centralauth_User', 'ss0-centralauth_Session']
  const requiredCookies = cookies
    .filter((c) => required.includes(c.name))
    .map((c) => [c.name, c.value])

  if (requiredCookies.length !== required.length) {
    return null
  }

  cookieCache = toCookieString(requiredCookies)
  return cookieCache
}

const toCookieString = (cookies) => cookies.map((c) => c.join('=')).join(';')
