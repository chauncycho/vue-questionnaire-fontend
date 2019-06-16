<template>
  <div class="my-container">
    <div class="my-box-wrapper">
      <el-input class="my-input-item" v-model="username" placeholder="账号"></el-input>
      <el-input type="password" @keyup.enter.native="onLogin" v-model="password" placeholder="密码"></el-input>
      <el-row class="my-row">
        <el-col class="my-col" :span="12">
          <el-button @click="onLogin">登录</el-button>
        </el-col>
        <el-col class="my-col" :span="12">
          <router-link to="register"><el-button>注册</el-button></router-link>
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
        this.$axios.post('/api/login',Qs.stringify({
          username:this.username,
          password:this.password
        })).then(response=>{
          console.log(response)
          if(response.data){
            this.$store.dispatch('setUser',response.data)//设置user到全局

            let interceptor = this.$axios.interceptors.request.use(config=>{//添加token拦截器
              config.headers['token'] = response.data.token;
              return config;
            },error=>{
              this.$message.error('请先登录ヽ(｀Д´)ﾉ')
              this.$router.push('/login')
              return Promise.reject(error)
            })

            this.$message({
              message:"登录成功(oﾟ▽ﾟ)o",
              type:"success"
            })

            this.$store.dispatch("addInterceptors",{name:"tokenInterceptor",interceptor});

            this.$router.push("/home")
          }else{
            this.$message({
              message:"登录失败",
              type:"error"
            })
          }
        }).catch(error=>{
          this.$message.error("Ohhhhh, 好像发生了错误(╥╯^╰╥)")
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
