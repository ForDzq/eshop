<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: isSmsLogin}" @click="changToSms">短信登录</a>
          <a href="javascript:;" :class="{on: !isSmsLogin}" @click="changToPwd">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: isSmsLogin}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button 
              :disabled="!isRightPhone || computedTime>0"
              class="get_verification" 
              :class="{on: isRightPhone}"
              @click.prevent="getCode" 
              >
              {{computedTime>0 ? `获取验证码${computedTime}s` : '获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !isSmsLogin}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type="isShowPwd ? 'password' : 'text'" maxlength="8" placeholder="密码" v-model="pwd">
                <div class="switch_button" @click="switchShowPassword" :class="isShowPwd ? 'off' : 'on'">
                  <div class="switch_circle"></div>
                  <span class="switch_text">abc</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="updateSvg" ref="changSvg">
              </section>
            </section>
          </div>
          <button class="login_submit" @click="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span href="javascript:" class="go_back" @click="$router.replace('/profile')">
        <i class="iconfont icon-jiantou2"></i>
      </span>
    </div>
  </div>
</template>

<script>
  import {sendCode} from '../../api/index'
  import {Toast} from 'mint-ui'
  import {smsLogin,pwdLogin} from '../../api/index'
  export default {
    name: 'Login',
    data () {
      return {
        isSmsLogin: true,
        computedTime: 0,
        isShowPwd: true,
        phone: '',
        code: '',
        name: '',
        pwd: '',
        captcha: ''
      }
    },
    methods: {
      changToSms () {
        this.isSmsLogin = true
      },
      changToPwd () {
        this.isSmsLogin = false
      },
      updateSvg () {
        this.$refs.changSvg.src = 'http://localhost:4000/captcha?time='+Date.now()
      },
      switchShowPassword () {
        this.isShowPwd = !this.isShowPwd
      },
      async getCode () {
        this.computedTime = 10
        const intervalId = setInterval(() => {
          this.computedTime--
          if(this.computedTime===0){
            clearInterval(intervalId)
          }
        },1000)
        let result = await sendCode(this.phone)
        if(result.code === 0) {
          Toast('发送成功')
        }else{
          Toast(result.msg)
        }  
      },
      async login () {
        let result
        if(this.isSmsLogin) {
          const {phone,code} = this
          if(!this.isRightPhone) {
            Toast('请输入正确手机号')
            return
          }else if(!/^\d{6}/.test(code)){
            Toast('请输入正确的验证码')
            return
          }
          result = await smsLogin({phone,code})
        }else {
          const {name,pwd,captcha} = this
          if(!name) {
            Toast('请输入用户名')
            return
          }else if(!pwd) {
            Toast('请输入密码')
            return
          }else if(!captcha) {
            Toast('请输入验证码')
            return
          }
          result = await pwdLogin({name,pwd,captcha})
        }
        
        if(result.code === 0) {
          const userInfo = result.data
          this.$store.dispatch('recordUser',userInfo)
          this.$router.replace('/profile')
        }else {
          Toast(result.msg)
        }
      }
    },
    computed: {
      isRightPhone () {
        return  /^1\d{10}$/.test(this.phone)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.on
                  color: #000000
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                  .switch_circle
                    transform translateX(27px)
                  .switch_text
                    float left
                    color #ddd
                >.switch_circle
                //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>