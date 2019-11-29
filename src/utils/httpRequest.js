import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import merge from 'lodash/merge'
import {apiUrl} from '@/utils/config.js'
import {Message} from 'element-ui'

const http = axios.create({
  timeout: 1000 * 30 * 10,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
  return config
}, error => {
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  if (response.data && response.data.code === "403") { // 403, token失效
    Vue.cookie.delete('token')
    router.options.isAddDynamicMenuRoutes = false
    // alert("登录过期!")
    router.push({name: 'login'})
    Message({
      message: '您已被登出，请重新登录',
      type: 'warning'
    });
  }
  if (response.data && response.data.code === "401") { // 401, 没有权限

  }
  if (response.data && response.data.code === "404") { // 404, 也没没有
    console.log('404')
    router.push({name: '404'})
  }
  return response
}, error => {
  return Promise.reject(error)
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  if (actionName && actionName.indexOf('http') != 0) {
    return apiUrl + actionName
  } else {
    return actionName;
  }
  // return 'https://jjx.lassetser.com/assets-manage' + actionName
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
  var defaults = {
    't': new Date().getTime()
  }
  return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
  var defaults = {
    't': new Date().getTime()
  }
  data = openDefultdata ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}
http.adorn1Data = (data = {}, openDefultdata = true, contentType = 'application/x-www-form-urlencoded') => {
  var defaults = {
    't': new Date().getTime()
  }
  data = openDefultdata ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}
export default http
