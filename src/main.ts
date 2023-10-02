/* eslint-disable */
import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// 加载全局样式
import '@root/global.css';
import '@root/global.less';
import '@root/global.scss';

// font-awesome图标
import 'font-awesome/css/font-awesome.min.css';

// mock
import '@sky/database/index';


const rainbow = createApp(App);

// 全局注册图标组件
import * as Icons from '@element-plus/icons-vue';
Object.keys(Icons).forEach((key) => {
    rainbow.component(key, Icons[key]);
});

// --- 原型 ---

import means from '@sky/means/index.js';
rainbow.config.globalProperties.$means = means;

// study: 全局注册过滤器
import filters from '@sky/filters';
rainbow.config.globalProperties.$filters = filters;
// axios
import apiHttp from '@sky/axios/request2/http.js';
rainbow.config.globalProperties.$apihttp = apiHttp;

// study: indexDb缓存(本地数据库)
let storeName = { index: ['ex_table_name'], name: 'ex_table_name', key: 'id' }; //index:索引、name:表名、key:主键
// 打开数据库
means.openDB('ex_dbname', 1, storeName, function (db) {
    // 全局保存数据库
    rainbow.config.globalProperties.$database = db;
});

/*
vue3 引入element-ui
element-plus官方文档：https://element-plus.gitee.io/zh-CN/guide/design.html
*/
import ElementUI from 'element-plus';
import 'element-plus/dist/index.css';

import VueCookies from 'vue-cookies';

import BaiduMap from 'vue-baidu-map';


rainbow
    .use(store)
    .use(router)
    .use(ElementUI, { size: 'small', zIndex: 3000 })
    .use(VueCookies)
    // .use(BaiduMap, {
    //     // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    //     ak: 'CFFiHT5dejkMz0DEVwGZCac1heaxOwUV'
    // })
    .mount('#app');
