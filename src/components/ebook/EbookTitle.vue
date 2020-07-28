<template>
  <transition name="slide-down">
    <div class="title-wrapper" v-show="titleVisible">
      <div class="left">
        <span class="icon-back" @click="back"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-shelf"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-cart"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more"></span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { ebookMixin } from '@/utils/mixin'
export default {
  mixins: [ebookMixin],
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.title-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 101;
  width: 100%;
  height: px2rem(48);
  background: #fff;
  box-shadow: 0px px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);
  display: flex;
  font-size: px2rem(20);
  .left {
    flex: 0 0 px2rem(60);
    @include center;
  }
  .right {
    display: flex;
    justify-content: flex-end;
    flex: 1;
    .icon-wrapper {
      flex: 0 0 px2rem(40);
      @include center;
    }
  }
}
</style>
