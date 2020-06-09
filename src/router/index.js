import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

// 解决vue-router在3.0版本以上重复点菜单报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import register from './register'
import login from './login'
import userinfo from './userinfo'
import edit from './edit'
import home from './home'
import notfound from './notfound'
import detail from './detail'

const routes = [
  { path: '/', redirect: 'home' },
  register, login, userinfo, edit, home, notfound,detail,
  { path: '*', redirect: 'notfound' }
]

const router = new VueRouter({
  // 上线环境下需要配置跳转的基础路径
  base:'/vue-bilibili/',
  mode: 'history',
  routes
})

//全局前置路由守卫，控制访问权限
router.beforeEach((to, from, next) => {
  // 判断是否有isToken同时本地存储里是否有token和id还有页面访问是否不用登录
  if (!localStorage.getItem('token') && !localStorage.getItem('id') && to.meta.isToken == true) {
    router.push('/login')
    Vue.prototype.$msg.fail('请重新登录')
    return
  }
  // 有就放行
  next()
})



export default router
