<template>
  <div>
    <div class="search-bar" :class="{'hide-title': !titleVisible, 'hide-shadow': !shadowVisible}">
      <transition name="title-move">
        <div class="search-bar-title-wrapper" v-show="titleVisible">
          <div class="title-text-wrapper">
            <span class="title-text title">{{$t('home.title')}}</span>
          </div>
          <div class="title-icon-shake-wrapper" @click="showFlapCard">
            <span class="icon-shake icon"></span>
          </div>
        </div>
      </transition>
      <div class="title-icon-back-wrapper" :class="{'hide-title': !titleVisible}" @click="back">
        <span class="icon-back icon"></span>
      </div>
      <div class="search-bar-input-wrapper" :class="{'hide-title': !titleVisible}">
        <div class="search-bar-input-blank" :class="{'hide-title': !titleVisible}"></div>
        <div class="search-bar-input">
          <div class="search-icon-wrapper">
            <span class="icon-search"></span>
          </div>
          <input
            type="text"
            :placeholder="$t('home.hint')"
            class="search-bar-input"
            @click="showHotSearch"
            @keyup.enter.exact="search"
            v-model="searchText"
          />
        </div>
      </div>
    </div>
    <hot-search-list v-show="hotSearchVisible" ref="hotSearch"></hot-search-list>
  </div>
</template>
<script>
import HotSearchList from './HotSearchList'
import { storeHomeMixin } from '@/utils/mixin'
export default {
  components: {
    HotSearchList
  },
  mixins: [storeHomeMixin],
  data() {
    return {
      searchText: '',
      titleVisible: true,
      shadowVisible: false,
      hotSearchVisible: false
    }
  },
  watch: {
    offsetY(offsetY) {
      if (offsetY > 0) {
        this.hideTitle()
        this.showShadow()
      } else {
        this.showTitle()
        this.hideShadow()
      }
    },
    hotSearchOffsetY(offsetY) {
      if (offsetY > 0) {
        this.showShadow()
      } else {
        this.hideShadow()
      }
    }
  },
  methods: {
    search() {
      this.$router.push({
        path: '/store/list',
        query: {
          keyword: this.searchText
        }
      })
    },
    showFlapCard() {
      this.setFlapCardVisible(true)
    },
    back() {
      this.hideHotSearch()
    },
    hideHotSearch() {
      if (this.offsetY > 0) {
        this.hideTitle()
        this.showShadow()
      } else {
        this.showTitle()
        this.hideShadow()
      }
      this.hotSearchVisible = false
    },
    showHotSearch() {
      this.hotSearchVisible = true
      this.hideShadow()
      this.hideTitle()
      this.$nextTick(() => {
        this.$refs.hotSearch.reset()
      })
    },
    hideTitle() {
      this.titleVisible = false
    },
    showTitle() {
      this.titleVisible = true
    },
    hideShadow() {
      this.shadowVisible = false
    },
    showShadow() {
      this.shadowVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global';
.search-bar {
  position: relative;
  width: 100%;
  z-index: 150;
  height: px2rem(94);
  box-shadow: 0 px2rem(2) px2rem(2) rgba(0, 0, 0, 0.15);
  transition: box-shadow $animationTime $animationType;
  &.hide-title {
    height: px2rem(52);
  }
  &.hide-shadow {
    box-shadow: unset;
  }
  .search-bar-title-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    height: px2rem(42);
    width: 100%;
    .title-icon-shake-wrapper {
      position: absolute;
      right: px2rem(15);
      box-sizing: border-box;
      top: 0;
      height: px2rem(42);
      @include center;
    }
    .title-text-wrapper {
      width: 100%;
      height: px2rem(42);
      @include center;
    }
  }
  .title-icon-back-wrapper {
    z-index: 200;
    position: absolute;
    left: px2rem(15);
    box-sizing: border-box;
    top: 0;
    height: px2rem(42);
    transition: height $animationTime $animationType;
    @include center;
    &.hide-title {
      height: px2rem(52);
    }
  }
  .search-bar-input-wrapper {
    display: flex;
    position: absolute;
    left: 0;
    top: px2rem(42);
    padding: px2rem(10) px2rem(10);
    box-sizing: border-box;
    width: 100%;
    transition: top $animationTime $animationType;
    &.hide-title {
      top: 0;
    }
    .search-bar-input-blank {
      width: 0;
      flex: 0 0 0;
      transition: flex $animationTime $animationType;
      &.hide-title {
        flex: 0 0 px2rem(30);
      }
    }
    .search-bar-input {
      flex: 1;
      display: flex;
      border-radius: px2rem(24);
      height: px2rem(30);
      background: #f4f4f4;
      border: px2rem(1) solid #eee;
      .search-icon-wrapper {
        flex: 0 0 px2rem(45);
        font-size: px2rem(14);
        color: #999;
        @include center;
      }
      .search-bar-input {
        flex: 1;
        font-size: px2rem(12);
        box-sizing: border-box;
        padding-right: px2rem(25);
        outline: unset;
        border: unset;
        background: transparent;
        &::-webkit-input-placeholder {
          color: #ccc;
        }
      }
    }
  }
}
</style>