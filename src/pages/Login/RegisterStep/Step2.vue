<template>
  <div class="my-step2-container">
    <div class="my-card-wrapper">
      <el-card class="my-card">
        <h2 align="center">详细信息</h2>

<!--        上传-->
        <el-popover :disabled="step2.profile != ''" title="头像上传" placement="top-end" width="200" trigger="hover" content="赶快上传头像的说(～￣▽￣)～">
          <el-upload
            slot="reference"
            class="avatar-uploader"
            action="/api/register/profileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="step2.profile" :src="step2.profile" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-popover>

        <div class="my-row">
          <el-switch
            v-model="step2.isEditor"
            active-text="成为出题者"
            inactive-text="普通用户">
          </el-switch>
        </div>
        <div class="my-row">
          <el-button @click="prev">上一步</el-button>
          <el-button @click="next" type="primary">下一步</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'Step2',
    data(){
      return {
        step2: {
          profile: '',
          isEditor: false
        }
      }
    },
    methods:{
      prev(){
        this.$router.push('step1')
      },
      next(){
        if(this.check()) {
          this.$router.push('step3')
          this.registerData['step2'] = this.step2;
          this.$store.dispatch('setRegisterData', this.registerData)
        }else{
          this.$message.error("上传完头像再走嘛╮(￣▽￣)╭我都不知道你长啥样")
        }
      },
      check(){
        if (this.step2.profile && this.step2.profile != ''){
          return true
        }else{
          return false
        }
      },
      handleAvatarSuccess(res, file) {
        this.step2.profile = res;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    computed:{
      ...mapState(['registerStep','registerData'])
    },
    mounted () {
      this.$store.dispatch('setRegisterStep',1)
      if(this.registerData.step2){
        this.step2 = this.registerData.step2
      }
    }
  }
</script>

<style lang="less">
  .my-step2-container {
    .my-step2-container {
      text-align: center;
    }

    .my-card-wrapper {
      display: inline-block;
      width: 700px;
    }

    .my-card {
      padding: 0px 50px 20px 50px;
      margin-top: 30px;
    }

    .my-input-item {
      margin: 10px auto;
    }

    .my-row{
      margin-top: 20px;
    }

    /*图片*/
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }

    .avatar {
      width: 178px;
      height: 178px;
      display: block;
      object-fit: cover;
      object-position: 50% 50%;
    }
  }
</style>
