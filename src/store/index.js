import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex);

//引入小仓库
// import Home from "@/store/Home";
// import Login from "@/store/Login";
import user from './user';
import getters from "@/store/getter";
export default new Vuex.Store({
    //实现vue仓库模块式开发存储数据
    modules:{
        // Home,
        // Login,
        user,
    },
    getters
});
