import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

import { useWikiStore } from '@/stores'
import { RoutesMap } from '@/router'
import { getToken } from '@/csrf'

export const useAuthStore = defineStore('auth', () => {
  const wiki = useWikiStore()
  const router = useRouter()

  const token = ref(null)

  const authenticate = async () => {
    try {
      const newToken = await getToken()
      token.value = newToken

      wiki.loadLists()
    } catch (e) {
      router.push({ name: RoutesMap.login })
    }
  }

  return { authenticate, token }
})
