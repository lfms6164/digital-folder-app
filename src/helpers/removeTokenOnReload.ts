export const clearTokenOnReload = () => {
  window.addEventListener('beforeunload', () => {
    localStorage.removeItem('accessToken')
  })
}
