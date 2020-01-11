import MSite from 'pages/MSite/MSite'
import Search from 'pages/Search/Search'
import Order from 'pages/Order/Order'
import Profile from 'pages/Profile/Profile'
import Login from 'pages/Login/Login'
import Shop from 'pages/Shop/Shop'
import ShopGoods from 'pages/Shop/ShopGoods/ShopGoods'
import ShopRatings from 'pages/Shop/ShopRatings/ShopRatings'
import ShopInfo from 'pages/Shop/ShopInfo/ShopInfo'
export default [
  {
    path: '/msite',
    component: MSite,
    meta: {
      hasFooterGuide: true
    }
  }, {
    path: '/search',
    component: Search,
    meta: {
      hasFooterGuide: true
    }
  }, {
    path: '/order',
    component: Order,
    meta: {
      hasFooterGuide: true
    }
  }, {
    path: '/profile',
    component: Profile,
    meta: {
      hasFooterGuide: true
    }
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/',
    redirect: '/msite'
  }, {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: '/shop/shopgoods',
        component: ShopGoods
      }, {
        path: '/shop/shopratings',
        component: ShopRatings
      }, {
        path: '/shop/shopinfo',
        component: ShopInfo
      }
    ]
  } 
]