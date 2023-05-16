<template>
  <div>
    <el-descriptions class="margin-top" title="我的信息" :column="2" size="medium" border>
      <template slot="extra">
        <el-button type="info" @click="dialogUpdatePasswordFormVisible = true">修改密码</el-button>
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          用户名
        </template>
        {{userInfo.username}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-picture"></i>
          头像
        </template>
        <div class="demo-type">
          <el-avatar :size="60" :src="userInfo.avatar">

          </el-avatar>
        </div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          uid
        </template>
        {{userInfo.userId}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-medal"></i>
          学号
        </template>
        {{userInfo.stuNum}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user-solid"></i>
          姓名
        </template>
        {{userInfo.realName}}
      </el-descriptions-item>
    </el-descriptions>

    <el-dialog title="修改密码" :visible.sync="dialogUpdatePasswordFormVisible">
      <el-form ref="updatePasswordForm" :model="updatePasswordForm" :rules="passwordChangeRules">
        <el-form-item label="旧密码" :label-width="formLabelWidth" prop="oldPassword">
          <el-input type="password" v-model="updatePasswordForm.oldPassword" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">
          <el-input type="password" v-model="updatePasswordForm.newPassword" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="再次输入新密码" :label-width="formLabelWidth" prop="confirmPassword">
          <el-input type="password" v-model="updatePasswordForm.confirmPassword" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdatePasswordFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {updatePassword} from "@/api/login";
import {Message} from "element-ui";

export default {
  name: "index",
  created() {
    this.getMyInfo();
  },
  data(){
    const equalToPassword = (rule, value, callback) => {
      if (this.updatePasswordForm.newPassword !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return{
      userInfo:{
        userId:'',
        username:'',
        avatar:'',
        stuNum:'',
        realName:''
      },
      dialogUpdatePasswordFormVisible: false,
      updatePasswordForm:{
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      formLabelWidth: '120px',
      passwordChangeRules:{
        oldPassword: [
          { required: true, trigger: "blur", message: "请输入旧密码" },
          { min: 8, max: 16, message: '用户密码长度必须介于 8 和 16 之间', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, trigger: "blur", message: "请输入新的密码" },
          { min: 8, max: 16, message: '用户密码长度必须介于 8 和 16 之间', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, trigger: "blur", message: "请再次输入您的密码" },
          { required: true, validator: equalToPassword, trigger: "blur" }
        ],
      }
    }
  },
  methods:{
    getMyInfo(){
      this.$store.dispatch("GetUserInfo").then(()=>{
        this.userInfo.userId = this.$store.state.user.userId;
        this.userInfo.username = this.$store.state.user.username;
        this.userInfo.avatar = this.$store.state.user.avatar;
        this.userInfo.stuNum = this.$store.state.user.stuNum;
        this.userInfo.realName = this.$store.state.user.realName;
      });
    },
    changePassword(){
      const newPassword = this.updatePasswordForm.newPassword;
      const oldPassword = this.updatePasswordForm.oldPassword;
      this.$refs.updatePasswordForm.validate(valid=>{
        if (valid){
          this.$confirm('是否确认修改密码？','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            updatePassword(oldPassword,newPassword).then(()=>{
              Message.success("密码修改成功!请重新登录")
              this.$store.dispatch('LogOut').then(() => {
                this.$router.push("/login");
              })
            })

          }).catch(()=>{
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          })
        }
      })

      // updatePassword(oldPassword,newPassword).then(() =>{
      //
      // })
    }
  }
}
</script>

<style scoped>

</style>
