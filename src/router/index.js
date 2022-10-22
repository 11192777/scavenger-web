import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */

import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/

export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: {title: 'sss', icon: 'example'},
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/orgs',
    component: Layout,
    redirect: '/orgs/tenant',
    name: 'orgs',
    meta: {title: 'SQL适配', icon: 'example'},
    children: [
      {
        path: 'tenant',
        name: 'tenant',
        component: () => import('@/views/orgs/tenant'),
        meta: {title: '租户管理', icon: 'table'}
      },
      {
        path: 'company',
        name: 'company',
        component: () => import('@/views/orgs/company'),
        meta: { title: '公司管理', icon: 'table' },
      },
      // {
      //   path: 'department',
      //   name: 'department',
      //   component: () => import('@/views/orgs/department'),
      //   meta: { title: '部门管理', icon: 'table' }
      // },
      // {
      //   path: 'position',
      //   name: 'position',
      //   component: () => import('@/views/orgs/position'),
      //   meta: { title: '岗位管理', icon: 'table' }
      // },
      // {
      //   path: 'staff',
      //   name: 'staff',
      //   component: () => import('@/views/orgs/staff'),
      //   meta: { title: '员工管理', icon: 'table' }
      // }
    ]
  },
  // {
  //   path: '/shopping',
  //   component: Layout,
  //   redirect: '/shopping/market',
  //   name: 'shopping',
  //   meta: { title: '购物服务', icon: 'example' },
  //   children: [
  //     {
  //       path: 'market',
  //       name: 'market',
  //       component: () => import('@/views/shopping/market'),
  //       meta: { title: '超市管理', icon: 'table' }
  //     },
  //     {
  //       path: 'goodsClass',
  //       name: 'goodsClass',
  //       component: () => import('@/views/shopping/goodsClass'),
  //       meta: { title: '商品分类', icon: 'table' }
  //     },
  //     {
  //       path: 'repository',
  //       name: 'repository',
  //       component: () => import('@/views/shopping/repository'),
  //       meta: { title: '商品管理', icon: 'table' }
  //     },
  //     {
  //       path: 'show',
  //       name: 'show',
  //       component: () => import('@/views/shopping/show'),
  //       meta: { title: '货架管理', icon: 'table' }
  //     },
  //     {
  //       path: 'attachment/:id',
  //       name: 'attachment',
  //       component: () => import('@/views/shopping/attachment'),
  //       meta: { title: '图片上传', icon: 'table', noCache: true },
  //       hidden: true
  //     }
  //   ]
  // },
  // {
  //   path: '/courier',
  //   component: Layout,
  //   redirect: '/courier/staff',
  //   name: 'courier',
  //   meta: { title: '配送服务', icon: 'example' },
  //   children: [
  //     {
  //       path: 'courier',
  //       name: 'courier',
  //       component: () => import('@/views/courier/staff'),
  //       meta: { title: '配送人员', icon: 'table' }
  //     },
  //     {
  //       path: 'order',
  //       name: 'order',
  //       component: () => import('@/views/courier/order'),
  //       meta: { title: '订单查看', icon: 'table' }
  //     },
  //     {
  //       path: 'collect',
  //       name: 'collect',
  //       component: () => import('@/views/courier/collect'),
  //       meta: { title: '用户收藏', icon: 'table' },
  //       noCache: true
  //     }
  //   ]
  // },
  // {
  //   path: '/recommend',
  //   component: Layout,
  //   redirect: '/recommend/user',
  //   name: 'recommend',
  //   meta: { title: '推荐服务', icon: 'example' },
  //   children: [
  //     {
  //       path: 'userRem',
  //       name: 'userRem',
  //       component: () => import('@/views/recommend/user'),
  //       meta: { title: '用户推荐', icon: 'table' }
  //     },
  //     {
  //       path: 'goodsRem',
  //       name: 'goodsRem',
  //       component: () => import('@/views/recommend/goods'),
  //       meta: { title: '商品推荐', icon: 'table' }
  //     }
  //   ]
  // },
  // {
  //   path: '/audit',
  //   component: Layout,
  //   redirect: '/audit/log',
  //   name: 'audit',
  //   meta: { title: '系统日志', icon: 'example' },
  //   children: [
  //     {
  //       path: 'courier',
  //       name: 'courier',
  //       component: () => import('@/views/audit/log'),
  //       meta: { title: '系统日志', icon: 'table' }
  //     }
  //   ]
  // }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
