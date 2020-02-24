import Vue from 'vue'
import VueRouter from 'vue-router'
import FrameLayout from "../layout/FrameLayout";
import {getToken} from "../utils/tokenUtils";
import {message} from "ant-design-vue";
import BlackLayout from "../layout/BlackLayout";

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login')
  },
  {
    path: '/',
    name: 'home',
    component: FrameLayout,
    redirect: {
      name: 'main'
    },
    children: [
      {
        path: 'main',
        name: 'main',
        meta: {
          title: '概览',
          icon: 'contacts'
        },
        component: () => import('../views/Home')
      },
      {
        path: 'about',
        name: 'about',
        meta: {
          title: '关于',
          icon: 'contacts'
        },
        component: () => import('../views/About')
      },
      {
        path: 'customer',
        name: 'customerList',
        meta: {
          title: '客户查询',
          icon: 'contacts'
        },
        component: () => import('../views/Customer/CustomerList')
      },
      {
        path: 'system-settings',
        name: 'systemSetting',
        meta: {
          title: '系统设置',
          icon: 'setting',
          permission: ['system:manage']
        },
        component: BlackLayout,
        redirect: {
          name: 'systemSettingOverview',
        },
        children: [{
          path: 'overview',
          name: 'systemSettingOverview',
          meta: {
            title: '客户查询',
            icon: 'contacts'
          },
          component: () => import('../views/System/SystemMain.vue'),
        }]
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  if (to.name !== 'login') {
    if (!getToken()) {
      // eslint-disable-next-line no-unused-vars
      message.warning("登录失效，请重新登录", 1).then(_ => {
        next({
          name: 'login'
        });
      });
      return;
    }
  }
  next();
});

export default router
