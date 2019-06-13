<template>
  <div class="my-container">
    <div class="question-list-info-wrapper">
      <h3 class="my-title">新建问卷</h3>
      <el-input class="my-info-item" placeholder="题库名" maxlength="200" show-word-limit></el-input>
    </div>
    <div class="my-questions-wrapper">
      <div class="my-question-item" v-for="(question,index) in questionList" :key="index">
        <!--        问题类型-->
        <div class="my-score-option-row">
          <el-tag class="my-index-tag">第 {{index+1}} 题</el-tag>
          <el-radio-group class="my-question-item-option" v-model="question.type">
            <el-radio-button label="insert">填空</el-radio-button>
            <el-radio-button label="single">单选</el-radio-button>
            <el-radio-button label="multip">多选</el-radio-button>
            <el-radio-button label="answer">问答</el-radio-button>
          </el-radio-group>
          <el-input type="number" style="width: 120px" slot="append" placeholder="分数"
                    v-model="question.score"></el-input>
        </div>
        <!--        问题内容-->
        <el-input class="my-question-item-option" type="textarea" v-model="question.content" placeholder="问题内容">
        </el-input>
        <!--        问题-->
        <template v-if="question.type === 'insert'">
          insert
        </template>
        <template v-if="question.type === 'single'">
          single
        </template>
        <template v-if="question.type === 'multip'">
          multip
        </template>
        <template v-if="question.type === 'answer'">
          answer
        </template>
      </div>
    </div>
    <div class="my-question-addition-wrapper">
      <el-button @click="addQuestion">添加题目</el-button>
      <el-button>提交问卷</el-button>
      <el-button>提交后发布</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CreateQuestion',
    data () {
      return {
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
      }
    }
  }
</script>

<style scoped>
  .my-title {
    text-align: center;
  }

  .my-container {
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    border: 1px solid aqua;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
  }

  .my-question-item-option {
    margin: 10px;
  }

  .question-list-info-wrapper {

  }
</style>
