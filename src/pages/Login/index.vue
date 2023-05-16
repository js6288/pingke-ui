<template>
  <div class="login">
    <el-card>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
        <h3 class="title">登录</h3>
        <el-form-item prop="username" class="">
          <el-input
              v-model="loginForm.username"
              type="text"
              auto-complete="off"
              placeholder="账号"
              prefix-icon="el-icon-user"
              clearable
          >

          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="loginForm.password"
              type="password"
              auto-complete="off"
              placeholder="密码"
              prefix-icon="el-icon-lock"
              clearable
          >

          </el-input>
        </el-form-item>

        <el-form-item prop="code" v-show="vcodeIsSuccess">
          <el-input
              v-model="loginForm.code"
              auto-complete="off"
              placeholder="请输入答案"
              style="width: 63%;float: left"
              prefix-icon="el-icon-key"
          >
          </el-input>
          <div class="login-code" v-loading="eloading">
            <img :src="codeUrl" class="login-code-img"/>
          </div>
        </el-form-item>
        <el-form-item>
          <Vcode :show="vcodeIsShow" @success="vcodeOnSuccess" @close="vcodeOnClose" />
          <el-button @click="vcodeSubmit" style="float: left">点击获取验证码</el-button>
        </el-form-item>
<!--        <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;float: left">记住密码</el-checkbox>-->
        <el-form-item style="width:100%;">
          <el-button
              :loading="loading"
              size="medium"
              type="primary"
              style="width:100%;"
              @click="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {getCodeImg} from "@/api/login";
import Vcode from 'vue-puzzle-vcode';
import {encrypt} from "@/utils/jsencript";
export default {
  name: "index",
  data() {
    return {
      vcodeIsShow: false,
      vcodeIsSuccess: false,
      codeUrl: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          {required: true, trigger: "blur", message: "请输入您的账号"}
        ],
        password: [
          {required: true, trigger: "blur", message: "请输入您的密码"}
        ],
        code: [{required: true, trigger: "change", message: "请输入验证码"}]
      },
      loading: false,
      eloading: false
    };
  },
  components:{
    Vcode
  },
  methods:{
    vcodeSubmit(){
      this.vcodeIsShow = true;
    },
    vcodeOnSuccess(){
      this.vcodeIsShow = false;
      this.vcodeIsSuccess = true;
      //获取验证码
      this.getCode();
    },
    vcodeOnClose(){
      this.vcodeIsShow = false;
    },
    getCode(){
      this.eloading = true;
      getCodeImg().then(res=>{
        this.codeUrl = "data:image/gif;base64,"+res.img;
        this.loginForm.uuid = res.uuid;
        this.eloading = false;
      });
    },
    handleLogin(){
      this.$refs.loginForm.validate(valid => {
        if(valid){
          this.loading = true;
          this.loginForm.password = encrypt(this.loginForm.password);
          this.$store.dispatch('UserLogin',this.loginForm).then(()=>{
            console.log("登录成功跳转主页")
            //获取用户信息
            this.$store.dispatch("GetUserInfo");
            this.$router.push("home");
          }).catch(()=>{
            console.log("登录失败")
            this.loading = false;
            this.loginForm.password = '';
            this.loginForm.code = '';
          });
        }
      })

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  //background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}

.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 38px;

    input {
      height: 38px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}


.login-code-img {
  height: 38px;
}
</style>
