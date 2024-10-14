import axios from 'axios'

export const api = axios.create({
  //   baseURL: 'https://proft.avaloncapital.fund/',
  // })

  baseURL: 'http://localhost:3335/',
})

export default api
