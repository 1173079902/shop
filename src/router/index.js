import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
//注册路由组件
Vue.use(VueRouter)

const routes = []

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login }
  ]
})

export default router
