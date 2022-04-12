import axios from 'axios'
// import qs from 'qs'
import { toast } from 'react-toastify'
import { showMessage } from './status'
console.log(process.env.NODE_ENV)
const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/blogs-open' : '/blogs-open'
let axiosInstance = axios.create({
  baseURL: baseUrl
})

// axios实例拦截响应
axiosInstance.interceptors.response.use(
  (response) => {
    // if (response.headers.authorization) {
    //   localStorage.setItem('app_token', response.headers.authorization)
    // } else {
    //   if (response.data && response.data.token) {
    //     localStorage.setItem('app_token', response.data.token)
    //   }
    // }
    if (response.status === 200) {
      if (response.data.code === 200) {
        return response
      } else {
        toast.warn(response.data.message)
        return Promise.reject(response)
      }
    } else {
      toast.error(showMessage(response.status))
      return Promise.reject(response)
    }
  },
  // 请求失败
  (error) => {
    const { response } = error
    // console.log(response, 'response')
    if (response) {
      // 请求已发出，但是不在2xx的范围
      toast.error(showMessage(response.status))
      return Promise.reject(response.data)
    } else {
      toast.warn('网络连接异常,请稍后再试!')
    }
  }
)
// 不需要token的url

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(config, 'config')
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const request = (params) => {
  return axiosInstance({
    url: params.url,
    method: params.method,
    [params.method === 'get' ? 'params' : 'data']: params.data
  })
}
export default request
