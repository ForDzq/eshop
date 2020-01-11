import {RECEIVED_SHOPINFO,RECEIVED_SHOPGOODS,RECEIVED_SHOPRATINGS} from '../mutations-types'
import {reqShopInfo,reqShopGoods,reqShopRatings} from '../../api'

const state = {
  shopInfo: {},
  shopGoods: [],
  shopRating: []
}
const actions = {
  async getShopInfo ({commit}) {
    let result = await reqShopInfo()
    if(result.code === 0) {
      result = result.data
      commit(RECEIVED_SHOPINFO,{result})
    }
  },
  async getShopGoods ({commit}) {
    let result = await reqShopGoods()
    if(result.code === 0) {
      result = result.data
      commit(RECEIVED_SHOPGOODS,{result})
    }
  },
  async getShopRatings ({commit}) {
    let result = await reqShopRatings()
    if(result.code === 0) {
      result = result.data
      commit(RECEIVED_SHOPRATINGS,{result})
    }
  }
}
const mutations = {
  [RECEIVED_SHOPINFO] (state,{result}) {
    state.shopInfo = result
  },
  [RECEIVED_SHOPGOODS] (state,{result}) {
    state.shopGoods = result
  },
  [RECEIVED_SHOPRATINGS] (state,{result}) {
    state.shopRating = result
  }
}
const getters = {

}


export default {
  state,
  actions,
  mutations,
  getters
}