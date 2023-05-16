<template>
  <div>
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
    <div class="item-detail">

      <div class="item-info">
        <el-descriptions title="项目详细信息" label-style="width:120px" :column="3" border>
          <el-descriptions-item label="项目名">
            {{item.itemName}}
          </el-descriptions-item>
          <el-descriptions-item label="项目类型">
            {{item.itemType}}
          </el-descriptions-item>
          <el-descriptions-item label="项目创建时间">
            {{item.createTime}}
          </el-descriptions-item>
          <el-descriptions-item label="项目截至时间">
            {{item.endTime}}
          </el-descriptions-item>
          <el-descriptions-item label="项目联系人">
            {{item.contactName}}
          </el-descriptions-item>
          <el-descriptions-item label="你的联系方式">
            {{item.contactNumber}}
          </el-descriptions-item>
          <el-descriptions-item label="项目需求">
            {{item.requirement}}
          </el-descriptions-item>
        </el-descriptions>
      </div>


      <div class="progress">
        <el-steps v-if="active !== 4" :active="active" finish-status="finish" align-center>
          <el-step title="后台审核"></el-step>
          <el-step title="制作中"></el-step>
          <el-step title="已完成"></el-step>
        </el-steps>
        <el-result v-else icon="info" title="项目进度已终止，请重新申请">

        </el-result>
      </div>

      <div class="history-bar">
        <el-row :gutter="20">
          <el-col :span="6" :offset="4">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://api.maho.cc/random-img/pc.php?14" class="image">
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <el-button type="primary" size="medium">历史文件</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://api.maho.cc/random-img/pc.php?38" class="image">
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <el-button type="primary" size="medium">最新项目</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

      </div>


    </div>

  </div>
</template>

<script>
import {getItemDetail} from "@/api/item";

export default {
  name: "index",
  data() {
    return {
      active: 1,
      item: {
        itemName: '',
        itemType: '',
        requirement: '',
        createTime: '',
        itemStatus: '',
        endTime: '',
        contactName: '',
        contactNumber: ''
      }
    }
  },
  created() {
    this.showItemDetail()
  },
  methods:{
    goBack() {
      this.$router.push("/myItem")
    },
    showItemDetail(){
      const itemId = this.$route.params.itemId;

      getItemDetail(itemId).then(res =>{
        const item = res.item;
        item.endTime = item.endTime!==null?this.$moment(item.endTime).format('YYYY年MM月DD日'):"";
        item.createTime = item.createTime!==null?this.$moment(item.createTime).format('YYYY年MM月DD日'):"";
        if (item.itemStatus === "toBeSolved"){
          item.itemStatus = "审核中";
        }else if(item.itemStatus === "toBeFinished"){
          item.itemStatus = "正在制作";
        }else if(item.itemStatus === "finished"){
          item.itemStatus = "已完成";
        }else{
          item.itemStatus = "已取消";
        }
        this.item = item;
      })
    },
    showItemStep(){
      if (this.item.itemStatus === '审核中'){
        this.active = 1;
      }else if(this.item.itemStatus === '正在制作'){
        this.active = 2;
      }else if (this.item.itemStatus === '已完成'){
        this.active = 3;
      }else {
        this.active = 4
      }
    }
  }

}
</script>

<style scoped>
.item-detail{
  margin-top: 2%;
}
.progress{
  margin-top: 5%;
  text-align: center;
}
.history-bar{
  margin-top: 5%;
}
.image{
  width: 100%;
  height: 150px;
  display: block;
}
</style>
