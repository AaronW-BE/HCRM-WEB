import Vue from 'vue'
import VueRouter from 'vue-router'
import FrameLayout from "../layout/FrameLayout";
import {getToken} from "../utils/tokenUtils";
import {message} from "ant-design-vue";

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
        component: () => import('../views/Home')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/About')
      },
      {
        path: 'customer',
        name: 'customerList',
        meta: {
          title: '客户查询',
        },
        title: '客户查询',
        component: () => import('../views/Customer/CustomerList')
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
