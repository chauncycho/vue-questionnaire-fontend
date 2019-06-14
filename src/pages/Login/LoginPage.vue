<template>
  <div class="my-container">
    <div class="my-box-wrapper">
      <el-input class="my-input-item" v-model="username" placeholder="账号"></el-input>
      <el-input type="password" v-model="password" placeholder="密码"></el-input>
      <el-row class="my-row">
        <el-col class="my-col" :span="12">
          <el-button @click="onLogin">登录</el-button>
        </el-col>
        <el-col class="my-col" :span="12">
          <el-button>注册</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Qs from 'qs'
  export default {
    name: 'Login',
    data(){
      return {
        username:"",
        password:"",
      }
    },
    methods: {
      onLogin(){
        this.$axios.post('/login',Qs.stringify({
          username:this.username,
          password:this.password
        })).then(response=>{
          console.log(response)
          if(response.data){
            this.$store.dispatch('setUser',response.data)//设置user到全局
            this.$message({
              message:"登录成功",
              type:"success"
            })
          }else{
            this.$message({
              message:"登录失败",
              type:"error"
            })
          }
        }).catch(error=>{
          this.$message("Ohhhhh, 好像发生了错误")
        })
      }
    }
  }
</script>

<style scoped>
  .my-container {
    width: 100%;
    height: calc(100% - 200px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .my-box-wrapper {
    width: 300px;
    padding: 20px 40px;
    border-radius: 10px;
    border: 1px solid black;
  }

  .my-input-item,.my-row {
    margin: 10px 0;
  }

  .my-col {
    text-align: center;
  }
</style>
