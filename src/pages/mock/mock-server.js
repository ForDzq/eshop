import Mock from 'mockjs'
import shopData from './data'

Mock.mock('/shopinfo',{code: 0, data: shopData.info})
Mock.mock('/shopgoods',{code: 0, data: shopData.goods})
Mock.mock('/shopratings',{code: 0, data: shopData.ratings})
