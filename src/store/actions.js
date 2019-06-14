import {SET_USER} from '@/store/mutation-types'

export default {
  setUser({commit},user){
    commit(SET_USER,{user})
  }
}
