<template>
  <div>
    <transition name="slide-up">
      <div class="menu-wrapper" :class="{'hide-box-shadow': settingVisible != -1 || !titleVisible }" v-show="titleVisible">
        <div class="icon-wrapper">
          <span class="icon-menu" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-A" @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
    <ebook-setting-font></ebook-setting-font>
    <ebook-setting-font-popup></ebook-setting-font-popup>
    <ebook-setting-theme></ebook-setting-theme>
    <ebook-setting-progress></ebook-setting-progress>
    <ebook-slide></ebook-slide>
  </div>
</template>
<script>
import EbookSettingFont from './EbookSettingFont'
import EbookSettingTheme from './EbookSettingTheme'
import EbookSettingProgress from './EbookSettingProgress'
import EbookSlide from './EbookSlide'
import EbookSettingFontPopup from './EbookSettingFontPopup'
import { ebookMixin } from '@/utils/mixin'
export default {
  mixins: [ebookMixin],
  components: {
    EbookSettingFont,
    EbookSettingFontPopup,
    EbookSettingTheme,
    EbookSlide,
    EbookSettingProgress
  },
  methods: {
    showSetting(key) {
      this.setSettingVisible(key)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.menu-wrapper {
  display: flex;
  font-size: px2rem(20);
  background: #fff;
  position: absolute;
  z-index: 101;
  left: 0;
  bottom: 0;
  width: 100%;
  height: px2rem(48);
  box-shadow: 0px px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  .icon-wrapper {
    flex: 1;
    @include center;
  }
  &.hide-box-shadow {
    box-shadow: none;
  }
}
</style>