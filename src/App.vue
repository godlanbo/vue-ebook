<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <div class="text">ABCD</div>
    </div>
    <router-view/>
  </div>
</template>
<script>
window.addEventListener('DOMContentLoaded', () => {
  let html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})
export default {
  mounted () {
    this.$store.dispatch('setTest', 10).then(() => {
      console.log(this.$store.state.book.test)
    })
  }
}
</script>
<style lang="scss">
@import './assets/style/global.scss';
.text {
  font-size: px2rem(37.5);
}
</style>
