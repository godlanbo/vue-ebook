<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="titleVisible && settingVisible == 0">
      <div class="setting-font-size">
        <div class="preview" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>
        <div class="select-wrapper">
          <div
            class="select-item"
            v-for="(item, index) in fontSizeList"
            :key="index"
            @click="setFontSize(item.fontSize)"
          >
            <div class="line"></div>
            <div class="point-wrapper">
              <div class="point" v-show="defaultFontSize == item.fontSize">
                <div class="small-point"></div>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div
          class="preview"
          :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'}"
        >A</div>
      </div>
      <div class="setting-font-family" @click="showFontFamilyPopup">
        <div class="setting-font-family-text-wrapper">
          <span class="setting-font-family-text">{{defaultFontFamily}}</span>
        </div>
        <div class="setting-font-family-icon-wrapper">
          <span class="icon-forward"></span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { ebookMixin } from '@/utils/mixin'
import { FONT_SIZE_LIST } from '@/utils/book'
import { saveFontSize } from '@/utils/localStorage'
export default {
  mixins: [ebookMixin],
  data() {
    return {
      fontSizeList: FONT_SIZE_LIST
    }
  },
  methods: {
    setFontSize (fontSize) {
      this.setDefaultFontSize(fontSize)
      saveFontSize(this.fileName, fontSize)
      this.currentBook.rendition.themes.fontSize(fontSize)
    },
    showFontFamilyPopup () {
      this.setFontFamilyVisible(true)
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.setting-wrapper {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  left: 0;
  bottom: px2rem(47);
  height: px2rem(90);
  background: #fff;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  z-index: 100;
  .setting-font-size {
    display: flex;
    flex: 2;
    height: 100%;
    .preview {
      flex: 0 0 px2rem(40);
      box-sizing: border-box;
      &:first-child {
        padding-left: px2rem(20);
      }
      &:last-child {
        padding-right: px2rem(20);
      }
      @include center;
    }
    .select-wrapper {
      flex: 1;
      display: flex;
      .select-item {
        flex: 1;
        display: flex;
        align-items: center;
        &:first-child {
          .line {
            &:first-child {
              border-top: none;
            }
          }
        }
        &:last-child {
          .line {
            &:last-child {
              border-top: none;
            }
          }
        }
        .line {
          flex: 1;
          height: 0;
          border-top: px2rem(1) solid #ccc;
        }
        .point-wrapper {
          position: relative;
          flex: 0 0 0;
          width: 0;
          border-left: px2rem(1) solid #ccc;
          height: px2rem(7);
          .point {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: px2rem(18);
            height: px2rem(18);
            border-radius: 50%;
            border: px2rem(1) solid #ccc;
            background: #fff;
            box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, 0.15);
            @include center;
            .small-point {
              width: px2rem(5);
              height: px2rem(5);
              border-radius: 50%;
              background: #000;
            }
          }
        }
      }
    }
  }
  .setting-font-family {
    flex: 1;
    font-size: px2rem(14);
    @include center;
    &-icon-wrapper {
      @include center;
    }
  }
}
</style>