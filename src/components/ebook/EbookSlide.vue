<template>
  <transition name="fade">
    <div class="slide-content-wrapper" v-show="titleVisible && settingVisible == 3">
      <transition name="slide-right">
        <div class="content" v-if="settingVisible == 3">
          <div class="content-page-wrapper" v-if="bookAvailable">
            <div class="content-page">
              <component :is="currentTab == 1 ? content : bookmark"></component>
            </div>
            <div class="content-page-tab">
              <div
                class="content-page-tab-item"
                :class="{'selected': currentTab == 1}"
                @click="selectTab(1)"
              >{{$t('book.navigation')}}</div>
              <div
                class="content-page-tab-item"
                :class="{'selected': currentTab == 2}"
                @click="selectTab(2)"
              >{{$t('book.bookmark')}}</div>
            </div>
          </div>
          <div class="content-empty" v-else>
            <ebook-loading></ebook-loading>
          </div>
        </div>
      </transition>
      <div class="content-bg" @click="hide"></div>
    </div>
  </transition>
</template>
<script>
import { ebookMixin } from '@/utils/mixin'
import EbookSlideContents from './EbookSlideContents'
import EbookSlideBookmark from './EbookSlideBookmark'
import EbookLoading from './EbookLoading'
export default {
  mixins: [ebookMixin],
  components: {
    EbookSlideContents,
    EbookSlideBookmark,
    EbookLoading
  },
  data() {
    return {
      currentTab: 1,
      content: EbookSlideContents,
      bookmark: EbookSlideBookmark
    }
  },
  methods: {
    hide() {
      this.setTitleVisible(false)
      this.setSettingVisible(-1)
    },
    selectTab(tabIndex) {
      this.currentTab = tabIndex
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.slide-content-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 300;
  display: flex;
  .content {
    flex: 1;
    height: 100%;
    overflow: hidden;
    &-page-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      .content-page {
        flex: 1;
      }
      .content-page-tab {
        flex: 0 0 px2rem(40);
        display: flex;
        align-items: center;
        &-item {
          flex: 1;
          font-size: px2rem(14);
          @include center;
        }
      }
    }
    &-empty {
      width: 100%;
      height: 100%;
      @include center;
    }
  }
  .content-bg {
    height: 100%;
    flex: 0 0 px2rem(45);
  }
}
</style>