<template>
  <div class="item-form">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="项目名称" prop="itemName">
        <el-input v-model="form.itemName"></el-input>
      </el-form-item>

      <el-form-item label="项目内容" prop="itemType">
        <el-radio-group v-model="form.itemType">
          <el-radio label="PPT"></el-radio>
          <el-radio label="海报"></el-radio>
          <el-radio label="其他"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="项目具体需求" prop="requirement">
        <el-input type="textarea" v-model="form.requirement" :rows="8"
                  placeholder="请详细描述您的项目的具体需求，如果需求内容很多可以将需求文档与其他资源一起打包成压缩包上传">
        </el-input>
      </el-form-item>

      <el-form-item label="上传文件" prop="uploadAddress">
        <single-upload v-model="form.uploadAddress"></single-upload>
      </el-form-item>

      <el-form-item label="项目的截至时间" prop="endTime">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="项目联系人" prop="contactName">
        <el-input v-model="form.contactName"></el-input>
      </el-form-item>

      <el-form-item label="联系方式" prop="contactNumber">
        <el-input v-model="form.contactNumber"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>


  </div>
</template>

<script>
import SingleUpload from "@/components/upload/singleUpload";
import {commitItem} from "@/api/item";

export default {
  components: {SingleUpload},
  name: "index",
  data() {
    return {
      form: {
        itemName: '',
        itemType: '',
        requirement: '',
        uploadAddress: '',
        endTime: '',
        contactName: '',
        contactNumber: ''
      },
      rules: {
        itemName: [
          {required: true, message: '请输入项目名称', trigger: 'blur'},
          {min: 3, max: 10, message: '长度为 3 到 10 个字符', trigger: 'blur'}
        ],
        itemType: [
          {required: true, message: '请选择项目类型', trigger: 'change'}
        ],
        requirement: [
          {required: false, message: '不得超多100字', trigger: 'change', max: 100}
        ],
        endTime: [
          {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
        ],
        contactName: [
          {required: true, message: '请输入联系人姓名', trigger: 'blur'},
          {min: 2, max: 20, message: '长度为 2 到 20 个字符', trigger: 'blur'}
        ],
        contactNumber: [
          {required: true, message: '请输入联系电话', trigger: 'change'}
        ],
        uploadAddress: [
          {
            require: true, message: '你还没有上传你的素材', trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$confirm('请确认填写的项目信息是否正确无误', '确认提交', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            commitItem(this.form).then(res => {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.$router.push('/myItem')
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '已取消提交'
        });
      })

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }

}
</script>

<style scoped>
.item-form {
  width: 60%;
  margin-left: 15%;
}
</style>
