import axios from 'axios'
import qs from 'qs'
import store from '../store'
import router from '../router'

import {Toast} from 'mint-ui'

axios.defaults.timeout = 20000


axios.interceptors.request.use(config => {
  const {method,data} = config
  if(method.toUpperCase() === 'POST' && data && typeof data === 'object') {
    config.data = qs.stringify(data)
  }
  const {needToken} = config.headers
  if(needToken) {
    const token = localStorage.getItem('token_key') || store.state.user.token 
    console.log(store.state)
    console.log('11111111111')
    console.log(localStorage.getItem('token_key'))
    if(token) {
      config.headers['Authorization'] = token
    } else {
      const error = new Error('没有token,请登录')
      error.status = 401
      throw error
    }
  }
 
  return config
})

axios.interceptors.response.use(response => {
  return response.data
},error => {
  if(!error.response) {
    if(error.status===401) {
      if(router.currentRoute.path!=='/login') {
        router.replace('/login')
        Toast(error.message)
      } else {
        console.log('没有token,请求前取消的请求，已在login登录页面')
      }
    }
  } else {
    const status = error.response.status
    const msg = error.message
    if(status === 401) {//授权过期
      if(router.currentRoute.path !== '/login') {
        store.dispatch('logout')
        router.replace('/login')
        Toast(error.response.data.message)
      } else {
        console.log('token过期的请求，已在login')
      }
    } else if (status === 404) {
      Toast('请求的资源不存在')
    } else {
      Toast('请求异常' + msg)
    }
  }
  return new Promise(() => {})
})

export default axios