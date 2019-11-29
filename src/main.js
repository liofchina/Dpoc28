// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store' // api: https://github.com/vuejs/vuex
import VueCookie from 'vue-cookie' // api: https://github.com/alfhen/vue-cookie
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import '@/icons'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/scss/style.scss'
import {DAPIS} from './apis/index.js';
import {web3} from '@/apis/web3/index.js';
import {_Contract} from '@/apis/contracts/Contract.js';
import {ipfs} from '@/apis/ipfs/index.js';

Vue.use(ElementUI);
Vue.use(VueCookie);
Vue.use(web3);
Vue.config.productionTip = false;
// 挂载全局
Vue.prototype.$apis = DAPIS;
Vue.prototype.$Contract = _Contract;
Vue.prototype.$http = httpRequest; // ajax请求方法
Vue.prototype.$ipfs = ipfs;

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
