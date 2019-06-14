<template>
  <div class="my-container">
    <div class="question-list-info-wrapper">
      <h3 class="my-title">新建问卷</h3>
      <el-input class="my-info-item" autofocus placeholder="问卷名" maxlength="200" show-word-limit></el-input>
    </div>
    <div class="my-questions-wrapper">
      <div class="my-question-item" v-for="(question,index) in questionList" :key="index">
        <!--        问题类型-->
        <div class="my-score-option-row">
          <el-tag class="my-index-tag">第 {{index+1}} 题</el-tag>
          <el-radio-group class="my-question-item-option" v-model="question.type">
            <el-radio-button label="insert">填空</el-radio-button>
            <span @click="initQuestionOption(question)"><el-radio-button label="single">单选</el-radio-button></span>
            <span @click="initQuestionOption(question)"><el-radio-button label="multip">多选</el-radio-button></span>
            <el-radio-button label="answer">问答</el-radio-button>
          </el-radio-group>
          <el-input type="number" style="width: 120px" slot="append" placeholder="分数"
                    v-model="question.score"></el-input>
        </div>
        <!--        问题内容-->
        <el-input class="my-question-item-option" type="textarea" v-model="question.content" placeholder="问题内容">
        </el-input>
        <!--        问题-->
        <!--        填空-->
        <template v-if="question.type === 'insert'">
          <el-input placeholder="正确答案"></el-input>
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
          <el-input type="textarea" placeholder="正确答案"></el-input>
        </template>
      </div>
    </div>
    <div class="my-question-addition-wrapper">
      <el-button @click="addQuestion">添加题目</el-button>
      <el-button>提交问卷</el-button>
      <el-button @click="onTest">提交后发布</el-button>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
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
          trueAnswer: [],//正确答案
          score: '',//分数
          type: 'insert',//填空，单选，多选，问答
          choose: []//选项
        })
      },
      initQuestionOption (question) {
        question.trueAnswer = []
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
      onTest(){
        console.log(this.test)
      }
    },
    computed:{
      ...mapState(['test'])
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
</style>
