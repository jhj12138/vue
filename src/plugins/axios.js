//1.引入axios模块&字符串处理模块
import axios from 'axios'
import { Message } from 'element-ui'

//2.全局配置（后期请求接口，实际请求地址baseURL+url）

// axios.defaults.baseURL = 'https://api-web.jianqiyun.net/' // 正式接口
axios.defaults.baseURL = 'https://jianqiyun-simplebusinesscloud.frp.hanku.net.cn/' // 测试接口
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'

// const jqyToken = localStorage.getItem('jqyToken') || ''
// const tokenId = localStorage.getItem('tokenId') || ''
// axios.defaults.headers['Authorization'] = jqyToken
// axios.defaults.headers['tokenId'] = tokenId

// 3.全局处理（错误统一处理，推荐发送邮件报警）
// request 请求
// response 响应
// 作用：数据交给 then处理前 先交给下面这个方法处理

/**
 * Author: sz
 * request 请求 config 一定要做请求
 * response 响应 
 */

// 请求拦截
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('jqyToken')) {
      const jqyToken = localStorage.getItem('jqyToken') || ''
      const tokenId = localStorage.getItem('tokenId') || ''
      config.headers['Authriozation'] = jqyToken
      config.headers['tokenId'] = tokenId
    }
    return config
  },
  error => {
    return Promise.reject(error)
  } 
)

//响应拦截
axios.interceptors.response.use(
  response => {
    return Promise.resolve(response)
    // return Promise.resolve(response.data)
  },
  error => {
    // 对响应错误做点什么
    Message.close()
    switch (error.response.status) {
      case 401:
        // Message.error('身份信息过期,请重新登录')
        // setTimeout(() => {
        localStorage.removeItem('jqyToken')
        localStorage.removeItem('tokenId')
        location.reload()
        // }, 1000)
        break
      case 400:
        Message.error(error.response.data) 
        break
      case 404:
        Message.error('请求' + error.response.config.url + '接口不存在')
        break
      default:
        Message.error(error.response.data || error.response.config.url + '接口请求错误')
    }
    return Promise.reject(error)
  }
)