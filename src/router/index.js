import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */

import Layout from '../views/layout/Layout'
import CONST from '../../config/const'

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
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
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
    meta: { title: '组织架构', icon: 'example' },
    children: [
      {
        path: 'tenant',
        name: 'tenant',
        component: () => import('@/views/orgs/tenant'),
        meta: { title: '租户管理', icon: 'table', noCache: CONST.orgServer},
        hidden: CONST.orgServer
      },
      {
        path: 'company',
        name: 'company',
        component: () => import('@/views/orgs/company'),
        meta: { title: '公司管理', icon: 'table' }
      },
      {
        path: 'department',
        name: 'department',
        component: () => import('@/views/orgs/department'),
        meta: { title: '部门管理', icon: 'table' }
      },
      {
        path: 'position',
        name: 'position',
        component: () => import('@/views/orgs/position'),
        meta: { title: '岗位管理', icon: 'table' }
      },
      {
        path: 'staff',
        name: 'staff',
        component: () => import('@/views/orgs/staff'),
        meta: { title: '员工管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/shopping',
    component: Layout,
    redirect: '/shopping/market',
    name: 'shopping',
    meta: { title: '购物服务', icon: 'example' },
    children: [
      {
        path: 'market',
        name: 'market',
        component: () => import('@/views/shopping/market'),
        meta: { title: '超市管理', icon: 'table' }
      },
      {
        path: 'repository',
        name: 'repository',
        component: () => import('@/views/shopping/repository'),
        meta: { title: '商品管理', icon: 'table' }
      },
      {
        path: 'show',
        name: 'show',
        component: () => import('@/views/shopping/show'),
        meta: { title: '货架管理', icon: 'table' }
      },
      {
        path: 'attachment/:id',
        name: 'attachment',
        component: () => import('@/views/shopping/attachment'),
        meta: { title: '图片上传', icon: 'table' ,noCache: true},
        hidden: true
      },
    ]
  },
  {
    path: '/courier',
    component: Layout,
    redirect: '/courier/staff',
    name: 'courier',
    meta: { title: 'courier', icon: 'example' },
    children: [
      {
        path: 'courier',
        name: 'courier',
        component: () => import('@/views/courier/staff'),
        meta: { title: '配送服务', icon: 'table' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
