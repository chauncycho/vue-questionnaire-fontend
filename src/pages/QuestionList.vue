<template>
  <div class="my-container">
<!--    问卷列表-->
    <el-row>
      <el-col class="my-card-container" :xs="12" :sm="8" :lg="6" v-for="(question,index) in currentQuestionListData.content" :key="index">
        <el-card :body-style="{ padding : '0px'}">
          <div class="my-image-wrapper">
            <img v-if="question.profile" class="my-card-image" :src="question.profile" alt="">
            <img v-else class="my-card-image" src="../assets/profile1.jpg" alt="">
          </div>

          <div class="my-card-row">
            <div class="my-card-content-wrapper">
              <div class="my-card-content">{{question.title}}</div>
            </div>
          </div>

          <div class="my-card-row">
            <el-button @click="onEnterQuestionList(question.id)">进入问卷</el-button>
            <!--下拉菜单-->
            <el-dropdown>
              <el-button icon="el-icon-more" class="el-dropdown-link"></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-share">问卷分享</el-dropdown-item>
                <el-dropdown-item icon="el-icon-trophy">成绩排名</el-dropdown-item>
                <el-dropdown-item icon="el-icon-user">出题人信息</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

        </el-card>
      </el-col>
    </el-row>
<!--    分页-->
    <div class="page-divider-wrapper">
      <el-pagination background layout="prev, pager, next" @current-change="onChangePage" :page-size="size" :page-count="totalPages">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'QuestionList',
    data () {
      return {
        questionListData: '',
        currentQuestionListData: '',
        totalPages: 0,
        page: 1,
        size: 8
      }
    },
    mounted () {
      this.init();
    },
    methods: {
      init(){//初始化
        this.$axios.get('/api/question/questionList', {
          params: {
            page:this.page-1,
            size:this.size
          }
        }).then(response => {
          console.log(response.data)
          this.questionListData= response.data
          this.currentQuestionListData = response.data
          this.totalPages = response.data.totalPages
        }).catch(error => {
          console.log(error)
        })
      },
      getQuestionList (page, size) {//获取分页后的信息
        page-=1
        this.$axios.get('/api/question/questionList', {
          params: {
            page,
            size
          }
        }).then(response => {
            console.log(response.data)
            this.currentQuestionListData = response.data
        }).catch(error => {
            console.log(error)
        })
      },
      onChangePage(page){
        this.getQuestionList(page,this.size)
      },
      onEnterQuestionList(id){
        this.$store.dispatch('setCurrentQuestionListId',id)
        this.$router.push('/answerQuestion')
      }
    }
  }
</script>

<style scoped>
  .my-container {
    width: 100%;
    padding: 40px;
    box-sizing: border-box;
  }

  .page-divider-wrapper {
    width: 100%;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .my-card-container{
    padding: 10px 20px;
  }

  .my-card-row{
    width: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
    text-align: center;
  }
  .my-card-content-wrapper{
    margin: 5px 0px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 5px;
    border-radius: 5px;
  }
  .my-image-wrapper{
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
    margin: 0;
    position: relative;
  }
  .my-card-image{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
