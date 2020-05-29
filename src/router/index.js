import Vue from 'vue';
import VueRouter from 'vue-router';
import {routers, otherRouter, appRouter} from './router';
import login from "../views/login";
import postBar from "../views/postBar";

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'postBar',
      component: postBar
    },{
      path: '/login',
      name: 'login',
      component: login
    }
  ]
});
