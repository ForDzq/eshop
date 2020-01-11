import {RECEIVED_USER,RECEIVED_TOKEN,RESET_USER,RESET_TOKEN} from '../mutations-types'
import {reqAutoLogin} from '../../api/index'

const state={
  user: {},
  token: localStorage.getItem('token_key')
}
const actions={
  recordUser ({commit},user) {
    localStorage.setItem('token_key',user.token)
    commit(RECEIVED_TOKEN,{token: user.token})
    console.log('已发送')
    delete user.token
    commit(RECEIVED_USER,{user})
  },
  logout ({commit}) {
    commit(RESET_USER)
    commit(RESET_TOKEN)
    localStorage.removeItem('token_key')
  },
  async autoLogin ({commit,state}) {
    const token = state.user.token || localStorage.getItem('token_key')
    if(token) {
      const result = await reqAutoLogin()
      if(result.code === 0) {
        const user = result.data
        commit(RECEIVED_USER, {user})
      }
    }
  }
}
const mutations={
  [RECEIVED_USER] (state,{user}) {
    state.user = user
  },
  [RECEIVED_TOKEN] (state,{token}) {
    state.token = token
  },
  [RESET_USER] (state) {
    state.user = {}
  },
  [RESET_TOKEN] (state) {
    state.token = ''
  }

}
const getters={

}

export default {
  state,
  actions,
  mutations,
  getters
}