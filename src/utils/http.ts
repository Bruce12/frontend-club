import axios from 'axios'
import config from '@/../config'
// axios.defaults.withCredentials = true
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 1000 * 5
})
service.interceptors.request.use(config => {
  // 请求 token
  return config
})

service.interceptors.response.use(response => {
  const data = response.data
  if (response.status === 200) return Promise.resolve(data)
  else return Promise.reject(data)
})

export default service
