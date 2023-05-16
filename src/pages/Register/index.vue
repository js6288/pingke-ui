<template>
  <div class="register">
    <el-card class="register-card">
      <el-form ref="registerForm" label-position="left" label-width="80px" class="register-form" :model="registerForm" :rules="registerRules">
        <h3 class="title">注册</h3>
        <el-form-item  prop="username" label="用户名">
          <el-input
              type="text"
              placeholder="用户名必须由5-16个字符组成"
              v-model="registerForm.username"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
              type="password"
              placeholder="密码必须是8-16位的数字和字符组合"
              v-model="registerForm.password"
              show-password
          >

          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" label="确认密码">
          <el-input
              type="password"
              placeholder="与上面的密码一致"
              v-model="registerForm.confirmPassword"
              show-password
          >

          </el-input>
        </el-form-item>

        <el-form-item prop="stuNum" label="学号">
          <el-input
              type="text"
              placeholder="学号"
              v-model="registerForm.stuNum"
          >
          </el-input>
        </el-form-item>

        <el-form-item prop="realName" label="姓名">
          <el-input
              type="text"
              placeholder="姓名"
              v-model="registerForm.realName"
          >

          </el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="code" v-show="isSuccess">
          <el-input
              placeholder="请输入答案"
              v-model="registerForm.code"
              style="width: 63%;float: left"
          ></el-input>
          <div class="login-code">
            <img :src="codeUrl" class="login-code-img"/>
          </div>
        </el-form-item>

        <el-form-item>
          <Vcode :show="isShow" @success="onSuccess" @close="onClose"/>
          <el-button @click="submit" style="float: left">点击获取验证码</el-button>
        </el-form-item>

        <el-form-item style="width:100%;">
          <el-button
              :loading="loading"
              size="medium"
              type="primary"
              style="width:100%;"
              @click="handleRegister"
          >
            <span v-if="!loading">提交</span>
            <span v-else>注 册 中...</span>
          </el-button>
        </el-form-item>

      </el-form>

    </el-card>
  </div>
</template>

<script>
import Vcode from 'vue-puzzle-vcode';
import {getCodeImg,register} from "@/api/login";
import {encrypt} from "@/utils/jsencript";

export default {
  name: "index",
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.registerForm.password !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      codeUrl: '',
      isShow: false,
      isSuccess: false,
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
        stuNum: '',
        realName: '',
        code: '',
        uuid: ''
      },
      loading: false,
      registerRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" },
          { min: 5, max: 16, message: '用户账号长度必须介于 5 和 16 之间', trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" },
          { min: 8, max: 16, message: '用户密码长度必须介于 8 和 16 之间', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, trigger: "blur", message: "请再次输入您的密码" },
          { required: true, validator: equalToPassword, trigger: "blur" }
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }]
      }
    };
  },
  components: {
    Vcode,
  },
  methods: {
    submit() {
      this.isShow = true;
    },

    onSuccess(msg) {
      this.isShow = false; // 通过验证后，需要手动关闭模态框
      this.isSuccess = true;

      this.getCode();
    },

    onClose() {
      this.isShow = false;
    },

    getCode() {
      getCodeImg().then(res => {
        this.codeUrl = "data:image/gif;base64," + res.img;
        this.registerForm.uuid = res.uuid;
      });
    },

    handleRegister(){

      this.$refs.registerForm.validate(valid => {
        if (valid){
          this.loading = true;
          //用户密码rsa加密
          this.registerForm.password=encrypt(this.registerForm.password);
          //调用api注册
          register(this.registerForm).then(res =>{
            const username = this.registerForm.username;
            this.$alert("<font color='red'>恭喜你，您的账号 " + username + " 注册成功！</font>", '系统提示', {
              dangerouslyUseHTMLString: true,
              type: 'success'
            }).then(() => {
              this.$router.push("/login");
            }).catch(() => {});
          }).catch(() =>{
            this.loading = false;
            this.isSuccess = false;
            this.$refs["registerForm"].resetFields();
          })
        }
      })

    }
  },
}
</script>

<style lang="scss" scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
}

.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.register-form {
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
</style>
