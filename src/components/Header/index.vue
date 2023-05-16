<template>

  <div class="right-menu">
    <el-menu router="router" class="right-menu-item el-menu-demo"
             :default-active="this.$route.path"
             mode="horizontal"
    >
      <el-menu-item v-show="$route.meta.showNav===false" @click="goBackHome">返回首页</el-menu-item>
      <el-menu-item v-if="!getUserName" v-for="(item,i) in topNavList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>

    </el-menu>
    <div v-show="$route.meta.showNav"  class="avatar-container right-menu-item hover-effect" >
      <el-dropdown v-if="getUserName" trigger="click">
        <div class="avatar-wrapper">
          <img :src="getAvatar"
               class="user-avatar"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="toCenter">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown v-else trigger="click" @click.native="goLogin">
        <div class="avatar-wrapper">
          <img src="@/assets/head/topavatar.png"
               class="user-avatar"/>
        </div>
        <el-dropdown-menu>
          <el-dropdown-item></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>

<script>
import router from "@/router";
import {mapGetters, mapState} from "vuex";

export default {
  name: "index",
  data() {
    return {
      topNavList: [
        {name: '/login', navItem: '登录'},
        {name: '/register', navItem: '注册'},
      ]
    }
  },
  methods: {
    toCenter(){
      router.push('/personalCenter')
    },
    goLogin(){
      router.push('/login')
    },
    goBackHome() {
      router.push('/home')
    },
    async logout() {
      // alert("exit");
      this.$confirm("确定退出登陆吗？", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          this.$router.push("/home")
        })
      }).catch(() => {
      })
    }
  },

  computed: {
    getAvatar(){
      return this.$store.state.user.avatar
    },
    getUserName(){
      return this.$store.state.user.username;
    }
  }
}
</script>

<style lang="scss" scoped>

.right-menu {
  float: right;
  height: 100%;
  line-height: 50px;

  &:focus {
    outline: none;
  }

  .right-menu-item {
    margin-right: 0;
    display: inline-block;
    padding: 0 10px;
    height: 100%;
    font-size: 18px;
    //color: #ffffff;
    vertical-align: text-bottom;
    background-color: #efe0e0;

    &.hover-effect {
      cursor: pointer;
      transition: background .3s;

      &:hover {
        background: rgba(0, 0, 0, .425)
      }
    }
  }

  .avatar-container {
    margin-right: 0;

    .avatar-wrapper {
      margin-top: 4px;
      position: relative;

      .user-avatar {
        cursor: pointer;
        width: 50px;
        height: 50px;
        margin-right: 20px;
        margin-left: 20px;
        border-radius: 10px;
      }

    }
  }
}

</style>
