<template>
<div id="landing-page">
  <side-bar></side-bar>
  <hero-section></hero-section>
</div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import HeroSection from '@/components/HeroSection.vue'

export default {
  name: 'LandingPage',
  components: {
    SideBar,
    HeroSection

  }
}
</script>
<style lang="scss" scoped>
#landing-page {
        display: grid;
        grid-template-columns: 15% 85%;
        height: 100vh;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
