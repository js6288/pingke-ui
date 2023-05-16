<template>
  <div id="app">

    <el-container class="container">

      <el-header style="padding: 0">
        <Header></Header>
      </el-header>

      <el-container class="main-container">
        <el-aside v-show="$route.meta.showNav">
          <LeftNav></LeftNav>
        </el-aside>
        <el-main class="bg">
          <router-view></router-view>
        </el-main>
      </el-container>

      <el-footer v-show="$route.meta.showNav">
        <Footer></Footer>
      </el-footer>
    </el-container>

  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeftNav from "@/components/LeftNav";
export default {
  name: 'App',
  components: {
    Header,
    Footer,
    LeftNav
  },
}
</script>

<style>
body {
  margin: 0;
}
.el-header {
  background-color: #efe0e0;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-footer{
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  margin-top: auto;
}
.el-aside {
  background-color: #f4f6f8;
  color: #333;
  text-align: center;
  line-height: 200px;

}
.bg{
  /*text-align: center;*/
  /*height: 986px;*/
  /*background: url("assets/background-home.jpg") center no-repeat;*/
}

body > .el-container {
  margin-bottom: 40px;
  height: 100%;
}

/*.el-container:nth-child(5) .el-aside,*/
/*.el-container:nth-child(6) .el-aside {*/
/*  line-height: 260px;*/
/*}*/

/*.el-container:nth-child(7) .el-aside {*/
/*  line-height: 320px;*/
/*}*/

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  height: 100%;
  width: 100%;
  position: absolute;
  /*top: 0;*/
  /*left: 0;*/

}
.container{
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


</style>
