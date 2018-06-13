/* eslint-disable */
const __svg__ = { path: './assets/svg/*.svg', name: 'public/svg/[hash].svg' };
require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
