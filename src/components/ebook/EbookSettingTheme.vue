<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="titleVisible && settingVisible == 1">
      <div class="setting-theme">
        <div
          class="setting-theme-item"
          v-for="(item, index) in themeList"
          :key="index"
          @click="selectTheme(item.name)"
        >
          <div
            class="preview"
            :style="{'background': item.style.body.background}"
            :class="{'selected': item.name == defaultTheme}"
          ></div>
          <div class="theme-text" :class="{'selected': item.name == defaultTheme}">{{item.alias}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { ebookMixin } from '@/utils/mixin'
import { saveTheme } from '@/utils/localStorage'
export default {
  mixins: [ebookMixin],
  methods: {
    selectTheme(name) {
      saveTheme(this.fileName, name)
      this.setDefaultTheme(name).then(() => {
        this.currentBook.rendition.themes.select(name)
        this.initGlobalCss()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.setting-wrapper {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: px2rem(47);
  height: px2rem(90);
  background: #fff;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  z-index: 100;
  .setting-theme {
    display: flex;
    width: 100%;
    height: 100%;
    &-item {
      flex: 1;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: px2rem(5);
      .preview {
        flex: 1;
        width: 100%;
        height: 70%;
        margin-bottom: px2rem(5);
        box-sizing: border-box;
        &.selected {
          box-shadow: 0 px2rem(4) px2rem(6) rgba(0, 0, 0, 0.1);
        }
      }
      .theme-text {
        flex: 0 0 px2rem(30);
        font-size: px2rem(17);
        text-align: center;
        color: #ccc;
        &.selected {
          color: #333;
        }
      }
    }
  }
}
</style>