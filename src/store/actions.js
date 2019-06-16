import {
  ADD_INTERCEPTORS,
  REMOVE_INTERCEPTORS,
  SET_CURRENTQUESTION_LIST_ID,
  SET_REGISTER_DATA, SET_REGISTER_STEP,
  SET_USER
} from '@/store/mutation-types'

export default {
  setUser({commit},user){
    commit(SET_USER,{user})
  },
  addInterceptors({commit},{name,interceptor}){
    commit(ADD_INTERCEPTORS,{name,interceptor})
  },
  removeInterceptors({commit},name){
    commit(REMOVE_INTERCEPTORS,{name})
  },
  setCurrentQuestionListId({commit},id){
    commit(SET_CURRENTQUESTION_LIST_ID,{id})
  },
  setRegisterData({commit},data){
    commit(SET_REGISTER_DATA,{data})
  },
  setRegisterStep({commit},step){
    commit(SET_REGISTER_STEP,{step})
  }
}
