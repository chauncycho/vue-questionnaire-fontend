import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import QuestionList from '@/pages/QuestionList'
import Detail from '@/pages/Detail'
import Login from '@/pages/Login'
import LoginPage from '@/pages/Login/LoginPage'
import RegisterPage from '@/pages/Login/RegisterPage'
import CreateQuestion from '@/pages/CreateQuestion'
import AnswerPage from '@/pages/AnswerPage'
import Step1 from '@/pages/Login/RegisterStep/Step1'
import Step2 from '@/pages/Login/RegisterStep/Step2'
import Step3 from '@/pages/Login/RegisterStep/Step3'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    }, {
      path: '/home',
      name: 'Home',
      component: Home
    }, {
      path: '/questionList',
      name: 'QuestionList',
      component: QuestionList
    }, {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      redirect: '/login/login',
      children: [{
        path: 'login',
        component: LoginPage
      }, {
        path: 'register',
        component: RegisterPage,
        redirect: 'register/step1',
        children: [{
          path: 'step1',
          component: Step1
        },{
          path: 'step2',
          component: Step2
        },{
          path: 'step3',
          component: Step3
        }]

      }]
    },
    {
      path: '/createQuestion',
      name: 'CreateQuestion',
      component: CreateQuestion
    },
    {
      path: '/answerQuestion',
      name: 'AnswerQuestion',
      component: AnswerPage
    }
  ]
})
