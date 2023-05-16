import requests from "@/api/request";

//获取验证码
export function getCodeImg() {
    return requests({
        url: '/captchaImage',
        method: 'get',
        headers: {
            isToken: false
        },
        timeout: 20000
    })
}

//注册方法
export function register(data){
    return requests({
        url: '/user/register',
        method: 'post',
        headers: {
            isToken: false
        },
        data: data
    })
}

//登录
export function login(data) {
    return requests({
        url: '/user/login',
        method: 'post',
        headers: {
            isToken: false
        },
        data:data
    })
}

//获取用户详细信息
export function getUserInfo(){
    return requests({
        url: '/user/getUserInfo',
        method: 'get'
    })
}

//退出登录
export function logout(){
    return requests({
        url: '/user/logout',
        method: 'post'
    })
}

//用户修改密码
export function updatePassword(oldPassword,newPassword){
    const data = {
        oldPassword,
        newPassword
    }
    return requests({
        url: '/user/update/password',
        method: 'put',
        params: data
    })
}

//修改用户信息
export function updateUserInfo(data){
    return requests({
        url: '/user/update/userinfo',
        method: 'put',
        data: data
    })
}

//头像上传
export function avatar(avatar){
    return requests({
        url: '/user/avatar',
        method: 'post',
        params: avatar
    })
}
