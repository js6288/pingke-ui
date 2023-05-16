<template>
  <el-menu
      router="router"
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      >
    <el-menu-item style="margin-top: 20%" v-for="(item,i) in leftNavList" :key="i" :index="item.name" v-show="$route.meta.showNav">
      <i class="el-icon-menu"></i>
      <span slot="title">{{item.navItem}}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      leftNavList:[
        {name:'/home',navItem:'主页'},
        {name:'/service',navItem:'客服'},
        {name:'/createItem',navItem:'创建项目'},
        {name:'/myItem',navItem:'我的项目'}
      ]
    }
  }

}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 75%;
  min-height: 100%;
}
</style>
