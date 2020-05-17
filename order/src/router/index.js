import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  { path: '/singleSign', component: () => import('@/views/login/singleLogin'), hidden: true },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: false,
    meta: { title: '首页', icon: 'example' },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/custominof',
    component: Layout,
    redirect: '/custominof',
    name: 'CUSTOMINFO',
    meta: { title: '我的资料', icon: 'example' },
    children: [
      {
        path: 'baseinfo',
        name: 'Baseinfo',
        component: () => import('@/views/custominfo/baseinfo/baseinfo'),
        meta: { title: '基础资料', icon: 'table' }
      },
      {
        path: 'signinfo',
        name: 'Signinfo',
        component: () => import('@/views/custominfo/signinfo/signinfo'),
        meta: { title: '登录信息', icon: 'table' }
      },
      {
        path: 'psndocinfo',
        name: 'Psndocinfo',
        component: () => import('@/views/custominfo/psndocinfo/psndocinfo'),
        meta: { title: '人员管理', icon: 'table' }
      }
    ]
  },

  {
    path: '/product',
    component: Layout,
    redirect: '/product',
    name: 'PRODUCT',
    meta: { title: '产品管理', icon: 'example' },
    children: [
      {
        path: 'productinfo',
        name: 'Productinfo',
        component: () => import('@/views/product/productinfo/productinfo'),
        meta: { title: '产品维护', icon: 'table' }
      },
      {
        path: 'orderinfo',
        name: 'orderinfo',
        component: () => import('@/views/orders/orderinfo/orderinfo'),
        meta: { title: '我的订单', icon: 'table' }
      }
    ]
  },

  // {
  //   path: '/orders',
  //   component: Layout,
  //   redirect: '/orders',
  //   name: 'ORDERS',
  //   meta: { title: '订单管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'orderinfo',
  //       name: 'orderinfo',
  //       component: () => import('@/views/orders/orderinfo/orderinfo'),
  //       meta: { title: '我的订单', icon: 'table' }
  //     }
  //   ]
  // },

  // { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})