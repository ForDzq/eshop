<template>
  <div>
    <router-view></router-view>
    <FooterGuide></FooterGuide>
  </div>
</template>

<script type="text/ecmascript-6">
  import FooterGuide from 'components/FooterGuide/FooterGuide.vue'
  export default {
    name: 'App',
    components: {
      FooterGuide
    },
    mounted () {
      this.$store.dispatch('autoLogin')
      this.$store.dispatch('getAddress')
      this.$store.dispatch('getCategorys')   
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

 
</style>
