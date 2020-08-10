<template>
  <div class="popup" v-if="popupVisible">
    <transition name="fade">
      <div class="popup-bg" @click="hide" v-show="visible"></div>
    </transition>
    <transition name="popup-slide-up">
      <div class="popup-wrapper" v-show="visible">
        <div class="popup-title" v-if="title && title.length > 0">{{title}}</div>
        <div
          class="popup-btn"
          :class="{'danger' : item.type === 'danger'}"
          v-for="(item, index) in btn"
          :key="index"
          @click="item.click"
        >{{item.text}}</div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'popup',
  data() {
    return {
      popupVisible: false,
      visible: false,
    }
  },
  props: {
    title: String,
    btn: Array,
  },
  methods: {
    show() {
      this.popupVisible = true
      this.$nextTick(() => {
        this.visible = true
      })
    },
    hide() {
      this.visible = false
      setTimeout(() => {
        this.popupVisible = false
      }, 200)
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global';
.popup {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;
  .popup-bg {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  .popup-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
    z-index: 2000;
    .popup-title {
      width: 100%;
      height: px2rem(44);
      font-size: px2rem(14);
      line-height: px2rem(14);
      border-bottom: px2rem(1) solid #eee;
      padding: px2rem(15);
      box-sizing: border-box;
      color: #999;
      @include center;
    }
    .popup-btn {
      width: 100%;
      height: px2rem(60);
      border-bottom: px2rem(1) solid #eee;
      @include center;
      font-size: px2rem(16);
      font-weight: bold;
      color: #666;
      &.danger {
        color: $color-pink;
      }
    }
  }
}
</style>