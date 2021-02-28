export const standardHeaders = () => ({
  headers: {
    Authorization: window.localStorage.getItem('token'),
    'user__id': window.localStorage.getItem('id')
  }
})