<template>
  <div class="my-container">
    <div class="my-header-step">
      <el-steps :active="registerStep" align-center finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="详细信息"></el-step>
        <el-step title="确认信息"></el-step>
      </el-steps>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'RegisterPage',
    data(){
      return {

      }
    },
    computed:{
      ...mapState(['registerStep'])
    }
  }
</script>

<style scoped>
  .my-container{
    padding: 20px 30px;
    text-align: center;
  }
  .my-header-step{
    width: 70%;
    display: inline-block;
    text-align: left;
  }

</style>
