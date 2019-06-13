import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import QuestionList from '@/pages/QuestionList'
import Detail from '@/pages/Detail'
import Login from '@/pages/Login'
import LoginPage from '@/pages/Login/LoginPage'
import RegisterPage from '@/pages/Login/RegisterPage'
import CreateQuestion from '@/pages/CreateQuestion'

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
        component: RegisterPage
      }]
    },
    {
      path: '/createQuestion',
      name: 'CreateQuestion',
      component: CreateQuestion
    }
  ]
})
