<template>
  <div class="index">
    <el-row class="carousel">
      <el-col :span="20" :offset="2">
        <el-carousel :interval="10000" type="card" arrow="always">
          <el-carousel-item v-for="item in imgList" :key="item.imgId" v-loading="loading">
            <el-image :src="item.imgSrc" class="image" alt="">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <el-divider content-position="left"><h2>优秀项目展示</h2></el-divider>
    <el-row v-for="ad in adShowList" :key="ad.adId" type="flex" justify="center">
      <el-col :span="20">

        <el-card :body-style="{ padding: '0px' }">
          <el-image
            :src="ad.adSrc"
            class="ad-image"
          ></el-image>
          <div style="float: left">
            <h3 >{{ad.adName}}</h3>
            <span >{{ad.adIntroduce}}</span>
          </div>


        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import {getRollad} from "@/api/rollad";
import {getAdshow} from "@/api/adshow";

export default {
  computed:{

  },
  name: "index",
  created() {
    this.getRolladImgList();
    this.getExcellentProject();
  },
  data(){
    return{
      loading:true,
      imgList:null,
      adShowList:null
    }
  },
  methods: {
    getRolladImgList(){
      getRollad().then(res=>{
        this.imgList = res.rolladList;
      })
      this.loading = false;
    },
    getExcellentProject(){
      getAdshow().then(res=>{
        this.adShowList = res.adshowList;
        console.log(this.adShowList)
      })
    }
  }
}
</script>

<style>
.index{

}
.el-row{
  margin-bottom: 20px;
}
.image{
  width: 100%;
  height: 100%;
  opacity: 0.7;
}
.carousel{
  margin-top: 50px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: rgba(153, 169, 191, 0.2);
}

.el-carousel__item:nth-child(2n+1) {
  background-color: rgba(211, 220, 230, 0.2);
}
.ad-image{
  float: left;
  margin-top: 0;
  height: 250px;
  /*max-height: 10%;*/
  width: 35%;
  margin-right: 5%;
}

</style>
