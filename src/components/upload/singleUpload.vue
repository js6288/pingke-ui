<template>
  <div>
    <el-upload
      action="http://pingke.oss-cn-guangzhou.aliyuncs.com"
      :data="dataObj"
      :multiple="false" :show-file-list="showFileList"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
      class="upload-demo"
    >
      <el-button size="small" type="primary">点击上传附件</el-button>
      <div slot="tip" class="el-upload__tip">上传压缩包，只能上传一个文件，不超过20MB</div>
    </el-upload>
  </div>
</template>
<script>
import {policy} from './policy'
import {getUUID} from '@/utils'

export default {
    name: 'singleUpload',
    props: {
      value: String
    },
    computed: {
      imageUrl() {
        return this.value;
      },
      imageName() {
        if (this.value != null && this.value !== '') {
          const filename = this.value.substr(this.value.lastIndexOf("/") + 1)
          return filename.replace(/^(.*?)\_/, "");
        } else {
          return null;
        }
      },
      fileList() {
        return [{
          name: this.imageName,
          url: this.imageUrl
        }]
      },
      showFileList: {
        get: function () {
          return this.value !== null && this.value !== ''&& this.value!==undefined;
        },
        set: function (newValue) {
        }
      }
    },
    data() {
      return {
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: '',
          // callback:'',
        },
        dialogVisible: false
      };
    },
    methods: {
      emitInput(val) {
        console.log(val);
        this.$emit('input', val)
      },
      handleRemove(file, fileList) {
        this.emitInput('');
      },
      handlePreview(file) {
        this.dialogVisible = true;
      },
      beforeUpload(file) {
        const isLt20M = file.size/1024/1024 < 20;
        // 获取文件后缀名
        const fileExt = file.name.replace(/.+\./, "");
        // console.log(fileExt);
        if (['zip', 'rar','7z'].indexOf(fileExt.toLowerCase()) === -1){
          this.$notify({
            type: 'warning',
            message: '请上传后缀名为zip,rar或7z的附件！'
          });
          return false;
        }
        if (!isLt20M){
          console.log(isLt20M);
          this.$notify({
            type: 'warning',
            message: '上传文件的大小不能超过20M'
          });
          return false;
        }
        let _self = this;
        return new Promise((resolve, reject) => {
          policy().then(response => {
            // console.log("响应的数据",response);
            _self.dataObj.policy = response.policy;
            _self.dataObj.signature = response.signature;
            _self.dataObj.ossaccessKeyId = response.accessKeyId;
            _self.dataObj.key = response.dir +getUUID()+'_${filename}';
            _self.dataObj.dir = response.dir;
            _self.dataObj.host = response.host;
            // console.log("响应的数据222。。。",_self.dataObj);
            resolve(true)
          }).catch(err => {
            reject(false)
          })
        })
      },
      handleUploadSuccess(res, file) {
        console.log(file.name,"上传成功...");
        this.$message({
          type: 'success',
          message: '上传成功'
        })

        this.showFileList = true;
        this.fileList.pop();
        this.fileList.push({name: file.name, url: this.dataObj.host + '/' + this.dataObj.key.replace("${filename}",file.name) });
        this.emitInput(this.fileList[0].url);
      }
    }
  }
</script>
<style>

</style>


