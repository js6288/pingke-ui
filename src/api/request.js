//对axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from 'nprogress';
//引入进度条的样式
import "nprogress/nprogress.css";
import {Message, MessageBox} from "element-ui";
import {getToken} from "@/utils/auth";
export let isReLogin = {show:false};
//创建axios实例
const requests = axios.create({
   //基础路径，发请求的时候，路径当中会出现api
    baseURL:"/api",
    //代表请求超时的时间
    timeout:10000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
});


//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{

    //首先判断 config.headers.isToken 是否为 false，如果是，则表示当前请求不需要携带 token，直接返回 config 对象，不做任何处理。
    const isToken = (config.headers || {}).isToken === false
    if (getToken() && !isToken) {
        config.headers['token'] = getToken();
    }

    //进度条开始
    nprogress.start();
    //config:配置对象，对象有一个属性很重要，header请求头
    return config;
},error => {
    Promise.reject(error);
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功地回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    if (code === 401) {
        if (!isReLogin.show) {
            isReLogin.show = true;
            MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).then(() => {
                isReLogin.show = false;
                store.dispatch('LogOut').then(() => {
                    location.href = 'login'
                })
            }).catch(() => {
                isReLogin.show = false;
                nprogress.done();
            });
        }
        return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    }
    else if (code !== 200){
        Message({
            showClose: true,
            message: res.data.msg,
            type: "error"
        })
        nprogress.done();
        return Promise.reject("error");
    }else{
        //进度条结束
        nprogress.done();
        return res.data;
    }
},(error)=>{
    //响应失败的回调函数
    console.log(error);
    nprogress.done();
    let message = "系统繁忙，请稍后重试";
    Message({
        message: message,
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject(new Error('failed'))
})


export default requests;
