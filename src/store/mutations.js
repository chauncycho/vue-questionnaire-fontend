import {
  ADD_INTERCEPTORS, SET_REGISTER_STEP,
  REMOVE_INTERCEPTORS,
  SET_CURRENTQUESTION_LIST_ID,
  SET_REGISTER_DATA,
  SET_USER
} from '@/store/mutation-types'

export default {
  [SET_USER](state,{user}){
    state.user = user;
  },
  [ADD_INTERCEPTORS](state,{name,interceptor}){
    state.myInterceptors[name] = interceptor;
  },
  [REMOVE_INTERCEPTORS](state,{name}){
    delete state.myInterceptors[name];
  },
  [SET_CURRENTQUESTION_LIST_ID](state,{id}){
    state.currentQuestionListId = id;
  },
  [SET_REGISTER_DATA](state,{data}){
    state.registerData = data
  },
  [SET_REGISTER_STEP](state,{step}){
    state.registerStep = step;
  },
}
