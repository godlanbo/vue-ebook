<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="titleVisible && settingVisible == 2">
      <div class="setting-progress">
        <div class="read-time-wrapper">
          <span class="read-time-text">{{getReadTimeText()}}</span>
          <span class="icon-forward"></span>
        </div>
        <div class="progress-wrapper">
          <div class="progress-icon-wrapper" @click="prevSection">
            <span class="icon-back"></span>
          </div>
          <input
            type="range"
            max="100"
            min="0"
            step="1"
            class="progress"
            @change="onProgressChange($event.target.value)"
            @input="onProgressInput($event.target.value)"
            :value="progress"
            :disabled="!bookAvailable"
            :style="{'background-size': `${progress}% 100% !important`}"
          />
          <div class="progress-icon-wrapper" @click="nextSection">
            <span class="icon-forward"></span>
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-section-text">{{getSectionName}}</span>
          <span>({{bookAvailable ? progress + '%' : '加载中...'}})</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { ebookMixin } from '@/utils/mixin'
import { saveLocation, getReadTime } from '@/utils/localStorage'
export default {
  mixins: [ebookMixin],
  computed: {
    getSectionName() {
      if (this.bookAvailable) {
        const sectionInfo = this.currentBook.section(this.section)
        if (sectionInfo && sectionInfo.href) {
          return this.currentBook.navigation.get(sectionInfo.href).label
        }
      }
      return ''
    }
  },
  methods: {
    getReadTimeText() {
      return this.$t('book.haveRead').replace('$1', Math.ceil((getReadTime(this.fileName) || 0) / 60))
    },
    displayProgress() {
      const cfi = this.currentBook.locations.cfiFromPercentage(
        this.progress / 100
      )
      saveLocation(this.fileName, cfi)
      return this.currentBook.rendition.display(cfi)
    },
    onProgressChange(progress) {
      this.setProgress(progress).then(() => {
        return this.displayProgress()
      }).then(() => {
        this.updateSection()
      })
    },
    onProgressInput(progress) {
      this.setProgress(progress)
    },
    displaySection() {
      const sectionInfo = this.currentBook.section(this.section)
      this.currentBook.rendition.display(sectionInfo.href).then(() => {
        this.updateProgress()
      })
    },
    prevSection() {
      if (this.section > 0 && this.bookAvailable) {
        this.setSection(this.section - 1).then(() => {
          this.displaySection()
        })
      }
    },
    nextSection() {
      if (
        this.section < this.currentBook.spine.length - 1 &&
        this.bookAvailable
      ) {
        this.setSection(this.section + 1).then(() => {
          this.displaySection()
        })
      }
    }
  }
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
  .setting-progress {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 0 px2rem(10);
    display: flex;
    flex-direction: column;
    align-items: center;
    .read-time-wrapper {
      flex: 0 0 px2rem(30);
      @include center;
      font-size: px2rem(15);
    }
    .progress-wrapper {
      flex: 1;
      width: 100%;
      display: flex;
      align-items: center;
      .progress-icon-wrapper {
        flex: 0 0 px2rem(40);
        font-size: px2rem(25);
        @include center;
      }
      .progress {
        flex: 1;
        width: 100%;
        appearance: none;
        height: px2rem(2);
        // background: linear-gradient(#999, #999) no-repeat #ddd;
        // background-size: 0 100%;
        &:focus {
          outline: none;
        }
        &::-webkit-slider-thumb {
          appearance: none;
          height: px2rem(20);
          width: px2rem(20);
          border-radius: 50%;
          background: #fff;
          border: px2rem(1) solid #ddd;
          box-shadow: 0 px2rem(4) px2rem(4) 0 rgba(0, 0, 0, 0.15);
        }
      }
    }
    .text-wrapper {
      flex: 0 0 px2rem(40);
      font-size: px2rem(15);
      width: 100%;
      @include center;
      .progress-section-text {
        max-width: 50%;
        height: px2rem(20);
        line-height: px2rem(20);
        align-items: center;
        margin-right: px2rem(5);
        @include ellipsis;
      }
    }
  }
}
</style>