import {SET_USER} from '@/store/mutation-types'

export default {
  [SET_USER](state,{user}){
    state.user = user;
  }
}
