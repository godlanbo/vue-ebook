<template>
  <div class="ebook-slide-bookmark">
    <div class="slide-bookmark-title">{{$t('book.bookmark')}} · {{bookmark ? bookmark.length : 0}}</div>
    <scroll class="slide-bookmark-list" :top="48" :bottom="41">
      <div
        class="slide-bookmark-item"
        v-for="(item, index) in bookmark"
        :key="index"
        @click="displayBookmark(item.cfi)"
      >
        <div class="slide-bookmark-item-icon">
          <div class="icon-bookmark"></div>
        </div>
        <div class="slide-bookmark-item-text">{{item.text}}</div>
      </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from '../common/Scroll'
import { getBookmark } from '../../utils/localStorage'
import { ebookMixin } from '../../utils/mixin'

export default {
  mixins: [ebookMixin],
  components: {
    Scroll
  },
  data() {
    return {
      bookmark: null
    }
  },
  methods: {
    displayBookmark(target) {
      this.display(target, () => {
        this.setTitleVisible(false)
        this.setSettingVisible(-1)
      })
    }
  },
  mounted() {
    this.bookmark = getBookmark(this.fileName)
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.ebook-slide-bookmark {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .slide-bookmark-title {
    height: px2rem(48);
    padding: 0 px2rem(15);
    line-height: px2rem(48);
    font-size: px2rem(18);
    font-weight: bold;
    box-sizing: border-box;
  }
  .slide-bookmark-list {
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-bookmark-item {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: px2rem(15) 0;
      .slide-bookmark-item-icon {
        flex: 0 0 px2rem(30);
        margin-right: px2rem(15);
        font-size: px2rem(14);
        .icon-bookmark {
          height: px2rem(30);
          width: px2rem(30);
          border-radius: 50%;
          background: #bbb;
          @include center;
        }
      }
      .slide-bookmark-item-text {
        flex: 1;
        font-size: px2rem(14);
        line-height: px2rem(16);
        @include ellipsis2(3)
      }
    }
  }
}
</style>