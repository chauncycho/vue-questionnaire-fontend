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
          <img :src="user.profile" class="my-profile" alt="">
<!--          <el-image src="../../assets/profile1.jpg" class="my-profile" fit="cover">-->
<!--            <div slot="error">-->
<!--              <i class="el-icon-picture-outline"></i>-->
<!--            </div>-->
<!--          </el-image>-->
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人资料</el-dropdown-item>
          <el-dropdown-item>答题分析</el-dropdown-item>
          <router-link to="/createQuestion"><el-dropdown-item>创建问卷</el-dropdown-item></router-link>
          <span @click="onLogout"><el-dropdown-item>退出登录</el-dropdown-item></span>
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
    methods:{
      onLogout(){
        this.$confirm('亲~不要离开我(/□＼*)','退出',{
          confirmButtonText:'离开',
          cancelButtonText:'留下'
        }).then(()=>{
          this.$store.dispatch("setUser",{})
          this.$router.push("/login/login")
          this.$axios.interceptors.request.eject(this.myInterceptors.tokenInterceptor)
          this.$store.dispatch("removeInterceptors","tokenInterceptor")
          this.$message('さよなら(￣.￣)')
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '你是个好人(๑•̀ㅂ•́)و✧'
          })
        })

      }
    },
    computed:{
      ...mapState(['user','myInterceptors'])
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
    object-fit: cover;
  }
  .my-login-button{
    height: 50px;
  }
</style>
