
import { createStore } from 'vuex'

import getters from './getters.js'



let saveObj = {};

const files = require.context('./modular', false, /\.js$/);
console.log('context===', files,'-转数组-',files.keys());// ["./player.js", "./pool.js"]
files.keys().forEach(item => {
    const moduleName = item.replace(/(\.\/|\.js)/g, '');

    console.log('moduleName---', moduleName);// 结果player  文件名
    console.log('vuex文件导出内容', files(item).default);

    saveObj[moduleName] = files(item).default;
})

export default createStore({
  state: {
  },
  getters: getters,
  mutations: {

  },
  actions: {
  },
  modules: saveObj
})
