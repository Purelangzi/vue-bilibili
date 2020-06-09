import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入初始化样式
import './assets/styles/normalize.css'

// 导入所有vant组件
import Vant from 'vant';
import 'vant/lib/index.css';
//导入vant中的Toast轻提示组件
import {Toast} from 'vant';
// 引入封装的axios请求配置
import http from '../http'
// 引入字体图标样式
import '@/assets/fonts/iconfont.css'

// 挂载到vue原型上，方便使用
Vue.prototype.$http = http
Vue.prototype.$msg = Toast


Vue.use(Vant);

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
