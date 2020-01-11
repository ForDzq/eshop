import ajax from './ajax'

// ajax.defaults.baseURL = '	http://localhost:4000/'
const BASE = '/api'

//msite部分
export const reqAddress = (latitude,longitude) => ajax.get(BASE + `/position/${latitude},${longitude}`)
reqAddress("40.10038","116.36867")

export const reqCategorys = () => ajax({
  method: 'GET',
  url: BASE + '/index_category',
  headers: {
    needToken: true
  }
})

export const reqShops = ({latitude,longitude}) => ajax({
  method: 'GET',
  url: BASE + '/shops',
  params: {
    latitude,
    longitude,
  },
  headers: {
    needToken: true
  }
})


//登录部分
export const sendCode = (phone) => ajax.get(BASE + '/sendcode',{
  params: {
    phone
  }
})

export const smsLogin = ({phone,code}) => ajax({
  method: 'POST',
  url: BASE+'/login_sms',
  data: {
    phone,
    code
  }
})

export const pwdLogin = ({name,pwd,captcha}) => ajax({
  method: 'POST',
  url: BASE+'/login_pwd',
  data: {
    name,
    pwd,
    captcha
  }
})

export const reqAutoLogin = () => ajax({
  url: BASE + '/auto_login',
  headers: {
    needToken: true
  }
})


//shop部分
export const reqShopInfo = () => ajax({
  method: 'GET',
  url: BASE + '/shopinfo'
})
export const reqShopGoods = () => ajax({
  method: 'GET',
  url: BASE + '/shopgoods'
})
export const reqShopRatings = () => ajax({
  method: 'GET',
  url: BASE + '/shopratings'
})