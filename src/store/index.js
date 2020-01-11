import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import msite from './modules/msite'
import user from './modules/user'
import shop from './modules/shop'

export default new Vuex.Store({
  actions,
  mutations,
  getters,
  modules: {
    msite,
    user,
    shop
  }
})