import MSite from 'pages/MSite/MSite'
import Search from 'pages/Search/Search'
import Order from 'pages/Order/Order'
import Profile from 'pages/Profile/Profile'
import Login from 'pages/Login/Login'
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
  }
]