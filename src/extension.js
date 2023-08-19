const isFirefox = !!window.browser
const api = isFirefox ? window.browser : window.chrome

export const loadCookies = () => api.cookies.getAll({})
export const createTab = (url) => api.tabs.create({ url })
