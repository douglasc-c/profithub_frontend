import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://sys.profithub.tech/',
})

export default api
