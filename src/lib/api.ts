import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://proft.avaloncapital.fund/',
})

export default api
