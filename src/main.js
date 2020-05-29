import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './App.vue';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});

// // 引用axios，用于向后端服务发起http请求
// var axios = require('axios')
//
// //baseUrl由三部分组成：ip+port+路径
// //这个baseURL中路径部分一定要和tomcat中server.xml设置的<Context path="">一样
// //比如：<Context path="">，那么baseURL就要设置成http://47.93.44.20:8080
// //比如：<Context path="abc">，那么baseURL就要设置成http://47.93.44.20:8080/abc
// //比如：<Context path="abc/123">，那么baseURL就要设置成http://47.93.44.20:8080/abc/123
// axios.defaults.baseURL = "http://localhost:8080/"  //47.93.44.20是我的云服务器的公网ip，读者要改成自己的
// //如果该前端服务和后端服务都运行在本地，这里都ip改成localhost或127.0.0.1就好了
//
// //设置全局，每次ajax请求携带cookies
// // axios.defaults.withCredentials = true
//
// // 将API方法绑定到全局
// global.axios=axios;
