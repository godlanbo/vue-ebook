<template>
  <transition name="popup-slide-up">
    <div class="ebook-popup-list" v-show="fontFamilyVisible">
      <div class="ebook-popup-title">
        <div class="ebook-popup-title-icon" @click="hide">
          <span class="icon-down2"></span>
        </div>
        <span class="ebook-popup-title-text">{{$t('book.selectFont')}}</span>
      </div>
      <div class="ebook-popup-list-wrapper">
        <div
          class="ebook-popup-list-item"
          v-for="(item, index) in fontFamilyList"
          :key="index"
          @click="selectFontFamily(item.font)"
        >
          <div
            class="ebook-popup-list-item-text"
            :class="{'selected': isSelected(item)}"
          >{{item.font}}</div>
          <div class="ebook-popup-list-item-check" v-show="isSelected(item)">
            <span class="icon-check"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { ebookMixin } from '@/utils/mixin'
import { FONT_FAMILY } from '@/utils/book'
import { getFontFamily, saveFontFamily } from '@/utils/localStorage'
export default {
  mixins: [ebookMixin],
  data() {
    return {
      fontFamilyList: FONT_FAMILY
    }
  },
  methods: {
    selectFontFamily(font) {
      this.setDefaultFontFamily(font)
      saveFontFamily(this.fileName, font)
      if (font === 'Default') {
        this.currentBook.rendition.themes.font('Times New Roman')
      } else {
        this.currentBook.rendition.themes.font(font)
      }
    },
    isSelected(item) {
      return this.defaultFontFamily === item.font
    },
    hide() {
      this.setFontFamilyVisible(false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.ebook-popup-list {
  display: flex;
  flex-direction: column;
  // height: px2rem(200);
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  z-index: 300;
  box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, 0.1);
  .ebook-popup-title {
    position: relative;
    font-size: px2rem(16);
    font-weight: bold;
    border-bottom: px2rem(1) solid #b8b9bb;
    box-sizing: border-box;
    padding: px2rem(15);
    text-align: center;
    .ebook-popup-title-icon {
      position: absolute;
      left: px2rem(15);
      top: 0;
      height: 100%;
      @include center;
    }
  }
  .ebook-popup-list-wrapper {
    flex: 1;
    .ebook-popup-list-item {
      padding: px2rem(15);
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: px2rem(17);
      &-text.selected,
      &-check {
        color: #346cb9;
        font-weight: bold;
      }
    }
  }
}
</style>