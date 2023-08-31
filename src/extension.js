const isFirefox = !!window.browser
const api = isFirefox ? window.browser : window.chrome

export const createTab = (url, active = false) => api.tabs.create({ active, url })
export const getCurrentTabUrl = async () => {
  const tabs = await api.tabs.query({ currentWindow: true, active: true })
  return tabs[0].url
}
