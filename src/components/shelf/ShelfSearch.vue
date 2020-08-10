<template>
  <div
    class="shelf-search-wrapper"
    :class="{'search-top' : ifInputClicked, 'hide-shadow' : ifHideShadow}"
  >
    <div class="shelf-search" :class="{'search-top' : ifInputClicked}">
      <div class="search-wrapper">
        <div class="icon-search-wrapper">
          <span class="icon-search icon"></span>
        </div>
        <div class="search-input-wrapper">
          <input
            type="text"
            class="search-input"
            :placeholder="$t('shelf.search')"
            v-model="searchText"
            @click="onSearchClick"
          />
        </div>
        <div class="icon-clear-wrapper" v-show="searchText.length !== 0" @click="clearSearchText">
          <span class="icon-close-circle-fill"></span>
        </div>
      </div>
      <div class="icon-locale-wrapper" v-if="!ifInputClicked" @click="swtichLang">
        <span class="icon-cn icon" v-if="lang"></span>
        <span class="icon-en icon" v-else></span>
      </div>
      <div class="cancel-btn-wrapper" @click="onCancelClick" v-else>
        <div class="cancel-btn-text">{{$t('shelf.cancel')}}</div>
      </div>
    </div>
    <transition name="popup-slide-up">
      <div class="shelf-search-tab-wrapper" v-if="ifInputClicked">
        <div
          class="shelf-search-tab-item"
          v-for="item in tabs"
          :key="item.id"
          @click="onTabClick(item.id)"
        >
          <span
            class="shelf-search-tab-text"
            :class="{'is-selected': selectedTab === item.id}"
          >{{item.text}}</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { setLocalStorage } from '@/utils/localStorage'
import { storeShelfMixin } from '@/utils/mixin'
export default {
  mixins: [storeShelfMixin],
  computed: {
    lang() {
      return this.$i18n.locale === 'cn'
    },
    tabs() {
      return [
        {
          id: 1,
          text: this.$t('shelf.default'),
        },
        {
          id: 2,
          text: this.$t('shelf.progress'),
        },
        {
          id: 3,
          text: this.$t('shelf.purchase'),
        },
      ]
    },
  },
  watch: {
    offsetY(v) {
      if (v > 0 && this.ifInputClicked) {
        this.ifHideShadow = false
      } else {
        this.ifHideShadow = true
      }
    },
  },
  data() {
    return {
      ifInputClicked: false,
      searchText: '',
      selectedTab: 1,
      ifHideShadow: true,
    }
  },
  methods: {
    onTabClick(id) {
      this.selectedTab = id
    },
    swtichLang() {
      this.$i18n.locale = this.lang ? 'en' : 'cn'
      setLocalStorage('locale', this.$i18n.locale)
    },
    onSearchClick() {
      this.ifInputClicked = true
      this.setShelfTitleVisible(false)
    },
    onCancelClick() {
      this.ifInputClicked = false
      this.setShelfTitleVisible(true)
    },
    clearSearchText() {
      this.searchText = ''
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global';
.shelf-search-wrapper {
  position: relative;
  z-index: 105;
  height: px2rem(94);
  width: 100%;
  font-size: px2rem(16);
  background: white;
  box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, 0.1);
  &.hide-shadow {
    box-shadow: none;
  }
  &.search-top {
    position: fixed;
    top: 0;
    left: 0;
  }
  .shelf-search {
    position: absolute;
    height: px2rem(52);
    top: px2rem(42);
    left: 0;
    z-index: 105;
    display: flex;
    width: 100%;
    transition: top $animationTime linear;
    &.search-top {
      top: 0;
      z-index: 131;
    }
    .search-wrapper {
      flex: 1;
      display: flex;
      align-items: center;
      margin: px2rem(8) 0 px2rem(8) px2rem(10);
      border: px2rem(1) solid #ccc;
      border-radius: px2rem(5);
      .icon-search-wrapper {
        flex: 0 0 px2rem(22);
        @include right;
        .icon-search {
          font-size: px2rem(12);
        }
      }
      .search-input-wrapper {
        flex: 1;
        padding: 0 px2rem(10);
        box-sizing: border-box;
        .search-input {
          width: 100%;
          font-size: px2rem(14);
          border: unset;
          outline: unset;
          color: #333;
          &::-webkit-input-placeholder {
            color: #ccc;
            font-size: px2rem(14);
          }
        }
      }
      .icon-clear-wrapper {
        flex: 0 0 px2rem(24);
        @include left;
        font-size: px2rem(14);
        color: #ccc;
      }
    }
    .icon-locale-wrapper {
      flex: 0 0 px2rem(55);
      @include center;
      .icon-cn,
      .icon-en {
        font-size: px2rem(22);
        color: #666;
      }
    }
    .cancel-btn-wrapper {
      flex: 0 0 px2rem(55);
      @include center;
      .cancel-btn-text {
        font-size: px2rem(14);
        color: $color-blue;
      }
    }
  }
  .shelf-search-tab-wrapper {
    position: absolute;
    top: px2rem(52);
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: px2rem(42);
    background: white;
    .shelf-search-tab-item {
      @include center;
      .shelf-search-tab-text {
        font-size: px2rem(12);
        color: #999;
        &.is-selected {
          color: $color-blue;
        }
      }
    }
  }
}
</style>