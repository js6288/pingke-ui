import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
import router from "@/router";
//引入仓库
import store from "@/store";
import moment from "moment";
moment.locale('zh-cn');
Vue.prototype.$moment = moment;

//测试api

new Vue({
  render: h => h(App),
  //注册路由
  router,
  //注册仓库
  store
}).$mount('#app')
