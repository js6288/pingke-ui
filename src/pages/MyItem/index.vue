<template>
  <div>
    <h3 style="text-align: center">我的项目</h3>
    <el-empty :image-size="200" v-if="!myItemList"></el-empty>
    <el-row :gutter="20" v-else>
      <el-col :xs="8" :sm="6" :md="4" :lg="6" :xl="1"
              v-for="(o,index) in myItemList" :key="index">
        <el-card :body-style="{ padding: '0px' }">
            <img :src="imgSrc[index]" class="image">
          <div style="padding: 14px;">
            <span>{{o.itemName}}</span><br>
            状态：<span>{{o.itemStatus}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ o.createTime }}</time>
              <el-button type="text" class="button" @click.native="toItemProgress(o.itemId)">查看详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getMyItem} from "@/api/item";

export default {
  name: "index",
  data() {
    return {
      // currentDate: this.$moment("2022-03-31T13:25:18.000+00:00").format('YYYY年MM月DD日 HH时mm分'),
      myItemList:null,
      imgSrc:["https://api.maho.cc/random-img/pc.php?1","https://api.maho.cc/random-img/pc.php?2"]
    };
  },
  created() {
    this.getMyItemList();
    this.getItemPictureSrc()
  },
  methods: {
    getItemPictureSrc(){
      let src = "https://api.maho.cc/random-img/pc.php?";
      console.log("随机数：")
      let random = Math.floor(Math.random()*(100-1)+1);
      console.log(src+random);
      return src+random
    },
    toItemProgress(itemId){
      this.$router.push("/itemProgress/"+itemId);
    },
    getMyItemList(){
      getMyItem().then(res=>{
        // console.log(res);
        const items = res.itemList;
        // console.log(items);
        if (items.length > 0){
          for (let i = 0; i < items.length; i++) {
            items[i].endTime = items[i].endTime!==null?this.$moment(items[i].endTime).format('YYYY年MM月DD日'):"";
            items[i].createTime = items[i].createTime!==null?this.$moment(items[i].createTime).format('YYYY年MM月DD日'):"";
            if (items[i].itemStatus === "toBeSolved"){
              items[i].itemStatus = "审核中";
            }else if(items[i].itemStatus === "toBeFinished"){
              items[i].itemStatus = "正在制作";
            }else if(items[i].itemStatus === "finished"){
              items[i].itemStatus = "已完成";
            }else{
              items[i].itemStatus = "已取消";
            }
          }
          this.myItemList = items;
        }
        // console.log(this.myItemList);
      })
    }
  }
}
</script>

<style scoped>
.el-card{
  margin-top: 20px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 200px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
