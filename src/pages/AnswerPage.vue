<template>
  <div class="my-container">
    <div class="my-title-wrapper">
      <h2>{{questionListData.title}}</h2>
    </div>
    <div class="my-creator-info-wrapper">
      <h2>命题人 {{questionListData.createdByUser.username}}</h2>
    </div>
    <div class="my-questions">
      <div class="my-question-wrapper" v-for="(question,index) in questionListData.questions">
        <div class="my-question-content-wrapper">
          {{question.content.content}}
        </div>
        <template v-if="question.content.type === 'insert'">
          <el-input v-model="question.myAnswer" placeholder="请输入答案">
            <template v-if="question.content.score" slot="append">{{question.content.score}}分</template>
          </el-input>
        </template>
        <template v-if="question.content.type === 'single'">
          <div class="my-option-row">
            <el-radio-group v-model="question.myAnswer">
              <el-radio-button :label="index" v-for="(option,index) in question.content.choose" :key="index" border>{{option.content}}</el-radio-button>
            </el-radio-group>
            <el-button class="my-tip-button" v-if="question.content.score">{{question.content.score}}分</el-button>
          </div>
        </template>
        <template v-if="question.content.type === 'multip'">
          <div class="my-option-row">
            <el-checkbox-group v-model="question.myAnswer">
              <el-checkbox-button v-for="(option,index) in question.content.choose" :label="index" :key="index" border>{{option.content}}</el-checkbox-button>
            </el-checkbox-group>
            <el-button class="my-tip-button" v-if="question.content.score">{{question.content.score}}分</el-button>
          </div>
        </template>
        <template v-if="question.content.type === 'answer'">
          <el-input v-model="question.myAnswer" placeholder="请输入答案">
            <template v-if="question.content.score" slot="append">{{question.content.score}}分</template>
          </el-input>
        </template>
      </div>
    </div>
    <div class="my-foot-wrapper">
      <el-button style="width: 300px;border-radius: 10px" type="primary" @click="onSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'AnswerPage',
    data(){
      return {
        questionListData:{},
        listTest:[]
      }
    },
    methods:{
      getQuestionListData(){
        this.$axios.get('/api/question/question',{
          params:{
            id:this.currentQuestionListId
          }
        }).then(response=>{
          console.log(response.data)
          let questionListData = response.data
          for (let i = 0 ; i < questionListData.questions.length ; i++){
            switch (questionListData.questions[i].content.type) {
              case "insert":
              case "answer":
              case "single":
                questionListData.questions[i]['myAnswer'] = ''
                break;
              case "multip":
                questionListData.questions[i]['myAnswer'] = []
            }
          }
          this.questionListData = questionListData
        }).catch(error=>{
          console.log(error)
        })
      },
      onSubmit(){
        this.$axios.post('/api/answer/submit',this.questionListData)
          .then(response => {
            console.log(response)
            this.$message("提交成功了哟(￣▽￣)")
            this.$router.push("/questionList")
          })
          .catch(error => {
            console.log(error)
            this.$message.error("好像发生了错误(／_＼)")
          })
      }
    },
    computed:{
      ...mapState(['currentQuestionListId'])
    },
    mounted () {
      this.getQuestionListData()
    },
  }
</script>

<style scoped>
  .my-container{
    width: 100%;
    padding: 20px 30px;
    box-sizing: border-box;
  }
  .my-title-wrapper{
    text-align: center;
  }
  .my-creator-info-wrapper{
    text-align: right;
  }
  .my-question-content-wrapper{
    padding: 10px 15px;
    border: 1px solid aqua;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  .my-option-row{
    text-align: right;
  }
  .my-question-wrapper{
    margin: 10px 0px;
    padding: 10px;
    border: 1px solid aqua;
    border-radius: 10px;
  }
  .my-foot-wrapper{
    text-align: center;
  }
  .my-tip-button{
    background-color: #f5f7fb;
    color: #909399;
    font-weight: 400;
  }
  .my-tip-button:hover{
    cursor: default;
  }
  .my-tip-button:active{
    border: 1px solid #DCDFE6;
  }
  .el-checkbox-group,.el-radio-group{
    font-size: 0;
    display: inline-block;
    vertical-align: top;
  }
</style>
