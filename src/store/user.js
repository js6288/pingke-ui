import {getUserInfo, login, logout} from "@/api/login";
import {getToken, removeToken, setToken} from "@/utils/auth";

//登录和注册的模板
const state = {
    token: getToken(),
    userId:'',
    username: '',
    avatar: '',
    stuNum: '',
    realName: ''
};
const mutations = {
    SET_TOKEN:(state,token) =>{
        state.token = token;
    },
    SET_USER_ID:(state,userId) =>{
        state.userId = userId;
    },
    SET_USERNAME:(state,username)=>{
        state.username = username;
    },
    SET_AVATAR:(state,avatar)=>{
        state.avatar = avatar;
    },
    SET_STU_NUM:(state,stuNum)=>{
        state.stuNum = stuNum;
    },
    SET_REAL_NAME:(state,realName)=>{
        state.realName = realName;
    },
    //清空本地缓存
    CLEAR:(state)=>{
        state.token = '';
        state.username = '';
        state.avatar = '';
        state.stuNum = '';
        state.realName = '';
    }

};
const actions = {
    //登录
    UserLogin({commit},data){
        return new Promise((resolve,reject)=>{
            login(data).then(res => {
                setToken(res.token)
                commit('SET_TOKEN',res.token);
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    },
    //获取用户信息
    GetUserInfo({commit,state}){
        return new Promise((resolve,reject)=>{
            getUserInfo().then(res=>{
                console.log(res);
                const user = res.user;
                const avatar = user.avatar === ""?require('@/assets/head/default_avatar.png'):user.avatar;
                commit('SET_USERNAME',res.user.username);
                commit('SET_USER_ID',res.user.userId);
                commit('SET_AVATAR',avatar);
                commit('SET_STU_NUM',res.user.stuNum);
                commit('SET_REAL_NAME',res.user.realName);
                resolve(res);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    //退出登录
    LogOut({commit,state}){
        return new Promise((resolve,reject)=>{
            logout(state.token).then(()=>{
                commit('CLEAR');
                removeToken();
                resolve();
            }).catch(error=>{
                reject(error);
            })
        })
    }

};
const getters = {

};
export default {
    state,
    mutations,
    actions,
    getters
}
