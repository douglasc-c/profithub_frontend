import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://profit.avaloncapital.fund/',
})

export default api
