<template>
  <div class="my-container">
    <div class="my-box-wrapper">
      <el-input class="my-input-item" placeholder="账号"></el-input>
      <el-input type="password" placeholder="密码"></el-input>
      <el-row class="my-row">
        <el-col class="my-col" :span="12">
          <el-button>登录</el-button>
        </el-col>
        <el-col class="my-col" :span="12">
          <el-button>注册</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login'
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
