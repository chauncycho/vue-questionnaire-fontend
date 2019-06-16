<template>
  <div class="my-step3-container">
    <div class="my-card-wrapper">
      <el-card class="my-card">
        <h2 align="center">确认信息</h2>
        <el-form label-position="left" label-width="80px">
          <el-form-item label="用户名">
            <el-input :value="registerData.step1.username"></el-input>
          </el-form-item>
          <el-form-item label="用户类别">
            <el-input v-if="registerData.step2.isEditor" value="出题者"></el-input>
            <el-input v-else value="普通用户"></el-input>
          </el-form-item>
          <el-form-item label="头像" align="left">
            <img class="my-profile" :src="registerData.step2.profile" alt="">
          </el-form-item>
        </el-form>
        <el-button @click="prev">上一步</el-button>
        <el-button @click="finish" type="primary">完成注册</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'Step3',
    data(){
      return {

      }
    },
    methods:{
      prev(){
        this.$router.push('step2')
      },
      finish(){
        this.$axios.post('/api/register/register',{
          username:this.registerData.step1.username,
          password:this.registerData.step1.password,
          profile:this.registerData.step2.profile,
          isEditor:this.registerData.step2.isEditor
        }).then(response=>{
          console.log(response.data)
          if (response.data == 'success'){
            this.$message.success("恭喜你，注册成功啦~\\(≧▽≦)/~")
            this.$router.push('/login')
          }else{
            this.$message.error("咦~可能这个用户已经注册过了呢")
          }
        }).catch(error=>{
          console.log(error)
          this.$message.error("咦~好像出错了，麻烦联系管理员")
        })
      }
    },
    computed:{
      ...mapState(['registerStep','registerData'])
    },
    mounted () {
      this.$store.dispatch('setRegisterStep',2)
    }
  }
</script>

<style scoped>
  .my-step3-container {
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
  .my-profile{
    width: 150px;
    height: 150px;
    border: 1px dashed #d9d9d9;
    border-radius: 10px;
    object-position: 50% 50%;
    object-fit: cover;
  }
  .my-profile:hover{
    border-color: #409EFF;
  }
</style>
