<template>
  <div id="app">
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
}
</script>
<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  background: #7d8188;
  overflow: hidden;
}
</style>
