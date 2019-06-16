<template>
  <div class="my-step1-container">
    <div class="my-card-wrapper">
      <el-card class="my-card">
        <h2 align="center">基本信息</h2>
        <el-input class="my-input-item" v-model="step1.username" placeholder="用户名" maxlength="30" show-word-limit></el-input>
        <el-input class="my-input-item" v-model="step1.password" placeholder="密码" maxlength="30" type="password" show-word-limit></el-input>
        <el-button @click="cancel">取消注册</el-button>
        <el-button @click="next" type="primary">下一步</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'Step1',
    data(){
      return {
        step1:{
          username:"",
          password:""
        }
      }
    },
    methods:{
      cancel(){
        this.$message('哼╭(╯^╰)╮')
        this.$router.push("/home")
      },
      next(){
        if(this.check()) {
          this.$router.push("step2")
          this.registerData['step1'] = this.step1;
          this.$store.dispatch('setRegisterData', this.registerData)
        }else{
          this.$message.error('别急，填完再走嘛(￣▽￣)"')
        }
      },
      check(){
        if(this.step1.username && this.step1.username != '' && this.step1.password && this.step1.password != ''){
          return true;
        }else{
          return false;
        }
      }
    },
    computed:{
      ...mapState(['registerStep','registerData'])
    },
    mounted () {
      this.$store.dispatch('setRegisterStep',0)
      if (this.registerData.step1){
        this.step1 = this.registerData.step1
      }
    }
  }
</script>

<style scoped>
  .my-step1-container {
    text-align: center;
  }
  .my-card-wrapper{
    display: inline-block;
    width: 700px;
  }
  .my-card{
    padding: 0px 50px 20px 50px;
    margin-top: 30px;
  }
  .my-input-item{
    margin: 10px auto;
  }
</style>
