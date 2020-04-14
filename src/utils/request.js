import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // 设置token
      config.headers.Authorization = 'Token ' + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    switch (response.status) {
      case 400:
        Message({
          message: response.data.error,
          type: 'error',
          duration: 3 * 1000
        })
        break

      case 401:
        Message({
          message: '用户名或密码错误',
          type: 'error',
          duration: 3 * 1000
        }).then(() => {
          store.dispatch('user/login').then(() => {
            location.reload()
          })
        })
        break

      case 403:
        Message({
          message: '您没有权限访问',
          type: 'warning',
          duration: 3 * 1000
        })
        break

      case 500:
        Message({
          message: '服务器失联了',
          type: 'error',
          duration: 3 * 1000
        })
        break
    }

    return response
  },

  error => {
    return Promise.reject(error.response.data.error)
  })

export default service
