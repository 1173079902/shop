import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/fonts/iconfont.css'
//导入全局样式
import './assets/css/global.css'

import TreeTable from 'vue-table-with-tree-grid'

//导入vue-quill-editor（富文本编辑器）
import VueQuillEditor from 'vue-quill-editor'
//导入vue-quill-editor的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
//全局注册富文本组件
Vue.use(VueQuillEditor)

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//导入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use((config) => {
  // 展示进度条
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 在 response 拦截器中，隐藏进度条
axios.interceptors.response.use((config) => {
  NProgress.done()
  return config
})
axios.interceptors.response.use((res) => {
  if (res.data.meta.msg === '无效token' && res.data.meta.status === 400) {
    location.href = '/#/login'
  }
  return res
})
Vue.prototype.$http = axios

Vue.component('tree-table', TreeTable)

Vue.config.productionTip = false

//{{ date | dateFormat('yyyy-mm-dd') }} 不填默认 yyyy-mm-dd hh-mm-ss
// 过滤器， 进行时间的格式化
Vue.filter('dateFormat', function(dateStr, pattern = '') {
  let dt = new Date(dateStr)
  let y = dt.getFullYear()
  let m = (dt.getMonth() + 1).toString().padStart(2, '0')
  let d = dt
    .getDate()
    .toString()
    .padStart(2, '0')
  pattern.toLowerCase() //传入参数转成小写
  if (pattern.toLowerCase() === 'yyyy-mm-dd') {
    return `${y}-${m}-${d}`
  } else {
    let hh = dt
      .getHours()
      .toString()
      .padStart(2, '0')
    let mm = dt
      .getMinutes()
      .toString()
      .padStart(2, '0')
    let ss = dt
      .getSeconds()
      .toString()
      .padStart(2, '0')
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }
})

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
