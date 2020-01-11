import {RECEIVED_ADDRESS,RECEIVED_CATEGORYS,RECEIVED_SHOPS} from '../mutations-types'
import {reqAddress,reqCategorys,reqShops} from '../../api/index'
const state = {
  "latitude": "40.10038",
  "longitude": "116.36867",
  address: {},
  categorys: [],
  shops: []
}
const actions = {
  async getAddress({commit,state}){
    const {latitude,longitude} = state
    let result = await reqAddress(latitude,longitude)
    if(result.code === 0) {
      result = result.data
      commit(RECEIVED_ADDRESS,{result})
    }
  },

  async getCategorys({commit}) {
    let result = await reqCategorys()
    if(result.code === 0) {
      result = result.data
      commit(RECEIVED_CATEGORYS,{result})
    }
  },

  async getShops({commit,state}) {
    const {latitude,longitude} = state
    let result = await reqShops({latitude,longitude})
    if(result.code === 0) {
      result = result.data
      commit(RECEIVED_SHOPS,{result})
    }
  }
}
const mutations = {
  [RECEIVED_ADDRESS] (state,{result}) {
    state.address = result
  },
  [RECEIVED_CATEGORYS] (state ,{result}) {
    state.categorys = result
  },
  [RECEIVED_SHOPS] (state,{result}) {
    state.shops = result
  }
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters,
}