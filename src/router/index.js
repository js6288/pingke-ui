//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import routes from "@/router/routes";
import store from "@/store";
import {getToken} from "@/utils/auth";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {isReLogin} from "@/api/request";
import {Message} from "element-ui";

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写push|replace
VueRouter.prototype.push = function (location,resolve,reject){
    if (resolve && reject){
        originPush.call(this,location,resolve,reject);
    }else {
        originPush.call(this,location,()=>{},()=>{});
    }
}
VueRouter.prototype.replace = function (location,resolve,reject){
    if (resolve && reject){
        originReplace.call(this,location,resolve,reject);
    }else {
        originReplace.call(this,location,()=>{},()=>{});
    }
}


let router = new VueRouter({
    mode: 'history',
    routes
})


const whiteList = ['/login','/register','/home'];
router.beforeEach((to,form,next)=>{
    NProgress.start();
    let username = store.state.user.username;
    //判断用户是否登录
    if (getToken()){
        //已经登录而且还想去登录------不行
        if (to.path === "/login" || to.path === "/register"){
            next('/');
            NProgress.done();
        }else {
            if (username){
                next();
            }else {
                isReLogin.show = true;
                store.dispatch("GetUserInfo").then(()=>{
                    isReLogin.show = false;
                    //TODO 根据权限生成动态路由表

                    next();
                }).catch(err => {
                    console.log(isReLogin.show)
                    store.dispatch("LogOut").then(()=>{
                        Message.error(err)
                        next('/login');
                    })
                })
            }
        }
    }else {
        //没有登录
        let toPath = to.path;
        if (whiteList.indexOf(toPath) !== -1){
            // 在免登录白名单，直接进入
            next()
            NProgress.done()
        }else {
            Message({
                message:'请先登录',
                type:'warning'
            })
            next(`/login?redirect=${to.fullPath}`);
            // next('/login?redirect='+toPath)
            // next('/login');
            // router.push('/login')
            NProgress.done()
        }
    }

})


router.afterEach(() => {
    NProgress.done()
})

export default router;
