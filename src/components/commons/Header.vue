<template>
  <div id="my-header">
    <el-menu default-active="/home" mode="horizontal" router>
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/questionList">题库</el-menu-item>
    </el-menu>
    <div class="my-profile-wrapper">
<!--      个人信息-->
      <el-dropdown v-if="user.token">
        <span class="el-dropdown-link">
          <el-image src="/images/profile1.jpg" class="my-profile" fit="cover">
            <div slot="error">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人资料</el-dropdown-item>
          <el-dropdown-item>答题分析</el-dropdown-item>
          <router-link to="/createQuestion"><el-dropdown-item>创建问卷</el-dropdown-item></router-link>
        </el-dropdown-menu>
      </el-dropdown>

<!--      登录按钮-->
      <router-link v-if="!user.token" to="/login"><el-button class="my-login-button">登录</el-button></router-link>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'Header',
    data(){
      return {

      }
    },
    computed:{
      ...mapState(['user'])
    }
  }
</script>

<style scoped>
  #my-header{
    position: relative;
    margin: 0 30px;
  }
  .my-profile-wrapper{
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
  }
  .my-profile{
    width: 50px;
    height: 50px;
  }
  .my-profile img{
    object-position: 50% 50%;
  }
  .my-login-button{
    height: 50px;
  }
</style>
