import Vue from 'vue'
import VueRouter from 'vue-router'
// const QrcodeLink = () => import('@/views/qrcode')
const Layout = () => import('@/layout')
const Mine = () => import('@/views/mine') // 学员信息
const Main = () => import('@/views/main')
// Standard


Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/', 
  //   name: 'Layout',
  //   component: Layout,
  //   redirect: '/mine',
  //   children: [
  //     {
  //       path: 'mine',
  //       name: '首页',
  //       component: Mine
  //     }
  //   ]
  // },
  {
    path: '/', 
    redirect: '/mine',
  },
  {
    path: '/mine',
    name: '首页',
    component: Mine
  },
  {
    path: '/main',
    name: 'Main',
    component: Main
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
