import { useRouter } from 'vue-router'
import { RoutesMap } from '@/router'

export function usePanic() {
  const router = useRouter()

  const ohShit = (err) => {
    const defaultMessage = 'Unexpected error'
    const messageFromAPI = JSON.parse(err?.message)?.detail

    const message = messageFromAPI ?? defaultMessage
    router.push({ name: RoutesMap.panic, query: { message } })
  }

  return { ohShit }
}
