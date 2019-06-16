<template>
  <div class="my-create-question-container">
    <div class="question-list-info-wrapper">
      <h3 class="my-title">新建问卷</h3>
      <el-input class="my-info-item" v-model="questionTitle" autofocus placeholder="问卷名" maxlength="200"
                show-word-limit></el-input>
      <el-upload
        slot="reference"
        class="avatar-uploader"
        action="/api/register/profileUpload"
        :show-file-list="false"
        align="center"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="profile" :src="profile" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div class="my-questions-wrapper">
      <div class="my-question-item" v-for="(question,index) in questionList" :key="index">
        <!--        问题类型-->
        <div class="my-score-option-row">
          <el-tag class="my-index-tag">第 {{index+1}} 题</el-tag>
          <el-radio-group class="my-question-item-option" v-model="question.type">
            <span @click="initQuestionOption(question)"><el-radio-button label="insert">填空</el-radio-button></span>
            <span @click="initQuestionOption(question)"><el-radio-button label="single">单选</el-radio-button></span>
            <span @click="initQuestionOption(question)"><el-radio-button label="multip">多选</el-radio-button></span>
            <span @click="initQuestionOption(question)"><el-radio-button label="answer">问答</el-radio-button></span>
          </el-radio-group>
          <el-input type="number" style="width: 119px" slot="append" placeholder="分数"
                    v-model="question.score"></el-input>
        </div>
        <!--        问题内容-->
        <el-input class="my-question-item-option" type="textarea" v-model="question.content" placeholder="问题内容">
        </el-input>
        <!--        问题-->
        <!--        填空-->
        <template v-if="question.type === 'insert'">
          <el-input v-model="question.trueAnswer" placeholder="正确答案"></el-input>
        </template>
        <!--        单选-->
        <template v-if="question.type === 'single'">
          <div class="my-question-option-wrapper">
            <el-tag class="my-option-tag">单项选择</el-tag>
            <el-button style="margin-left: 10px" @click="addOption(question)">添加选项</el-button>
            <el-button @click="clearOption(question.choose)">清空选项</el-button>
            <el-select style="width: 170px" v-model="question.trueAnswer" clearable placeholder="正确答案">
              <el-option v-for="(option,index) in question.choose" :key="index" :label="'第'+(index+1)+'项'"
                         :value="index">
              </el-option>
            </el-select>
            <div class="my-question-option-item-wrapper">
              <div class="my-option-item" v-for="(option,index) in question.choose" :key="index">
                <el-input class="my-input-with-button" v-model="option.content" placeholder="选项内容">
                  <el-button class="my-delete-option" @click="optionDelete(question.choose,index)" icon="el-icon-delete"
                             slot="append"></el-button>
                </el-input>
              </div>
            </div>
          </div>
        </template>
        <!--        多选-->
        <template v-if="question.type === 'multip'">
          <div class="my-question-option-wrapper">
            <el-tag class="my-option-tag">多项选择</el-tag>
            <el-button style="margin-left: 10px" @click="addOption(question)">添加选项</el-button>
            <el-button @click="clearOption(question.choose)">清空选项</el-button>
            <el-select multiple collapse-tags style="width: 170px" v-model="question.trueAnswer" clearable
                       placeholder="正确答案">
              <el-option v-for="(option,index) in question.choose" :key="index" :label="'第'+(index+1)+'项'"
                         :value="index">
              </el-option>
            </el-select>
            <div class="my-question-option-item-wrapper">
              <div class="my-option-item" v-for="(option,index) in question.choose" :key="index">
                <el-input class="my-input-with-button" v-model="option.content" placeholder="选项内容">
                  <el-button class="my-delete-option" @click="optionDelete(question.choose,index)" icon="el-icon-delete"
                             slot="append"></el-button>
                </el-input>
              </div>
            </div>
          </div>
        </template>
        <!--        问答-->
        <template v-if="question.type === 'answer'">
          <el-input v-model="question.trueAnswer" type="textarea" placeholder="正确答案"></el-input>
        </template>
      </div>
    </div>
    <div class="my-question-addition-wrapper">
      <el-button @click="addQuestion">添加题目</el-button>
      <el-button @click="submitQuestion">提交问卷</el-button>
      <el-button @click="myTest">提交后发布</el-button>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Qs from 'qs'

  export default {
    name: 'CreateQuestion',
    data () {
      return {
        questionTitle: '',
        profile: '',
        questionList: []
      }
    },
    methods: {
      addQuestion () {
        this.questionList.push({
          content: '',//问题内容
          trueAnswer: '',//正确答案
          score: '',//分数
          type: 'insert',//填空，单选，多选，问答
          choose: []//选项
        })
      },
      initQuestionOption (question) {
        question.trueAnswer = ''
      },
      addOption (question) {
        question.choose.push({
          content: ''
        })
      },
      optionDelete (choose, index) {
        choose.splice(index, 1)
      },
      clearOption (choose) {
        choose.splice(0, choose.length)
      },
      submitQuestion () {
        this.$axios.post('/api/question/submit', {
          questionList: this.questionList,
          questionTitle: this.questionTitle,
          profile: this.profile,
          user: this.user
        })
          .then(response => {
            if (response.status === 200) {
              this.$message('提交成功 (*￣∇￣*)')
              this.$router.push('/questionList')
            }
          })
          .catch(error => {
            this.$message.error('好像发生了错误 Σ（ﾟдﾟlll）')
          })
      },
      myTest () {
        this.$axios.get('/api/test')
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      },
      handleAvatarSuccess (res, file) {
        console.log(res)
        this.profile = res
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>

<style lang="less">
  .my-create-question-container {
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .my-title {
      text-align: center;
    }

    .my-index-tag {
      height: 40px;
      vertical-align: middle;
      line-height: 40px;
      text-align: center;
      width: 70px;
    }

    .my-info-item, .my-question-item {
      width: 300px;
      margin: 20px 0;
    }

    .my-question-item {
      width: 500px;
      padding: 20px;
      border: 1px solid #DCDFE6;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-items: center;
    }

    .my-question-item:hover {
      border-color: #C0C4CC;
    }

    .my-question-item-option {
      margin: 10px;
    }

    .question-list-info-wrapper {

    }

    .my-question-option-wrapper {
      border: 1px solid #DCDFE6;
      border-radius: 8px;
      padding: 10px;
      box-sizing: border-box;
      width: 100%;
    }

    .my-question-option-wrapper:hover {
      border-color: #C0C4CC;
    }

    .my-option-tag {
      width: 70px;
      height: 40px;
      vertical-align: baseline;
      line-height: 40px;
      text-align: center;
    }

    .my-option-item {
      margin: 10px;
    }

    /*图片*/

    .avatar-uploader {
      margin-bottom: 10px;
    }

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
