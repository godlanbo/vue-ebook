<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input
          type="text"
          v-model="searchText"
          :placeholder="$t('book.searchHint')"
          class="slide-contents-search-input"
          @keyup.enter="search()"
          @click="showSearchPage"
        />
      </div>
      <div
        class="slide-contents-search-cancel"
        v-if="searchVisible"
        @click="hideSearchPage"
      >{{$t('book.cancel')}}</div>
    </div>
    <div class="slide-contents-book-wrapper" v-show="!searchVisible">
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" alt="封面" class="slide-contents-book-img" />
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">{{metadata.title}}</div>
        <div class="slide-contents-book-author">{{metadata.creator}}</div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <div class="slide-contents-book-time">
          <span>{{getReadTimeText()}}</span>
        </div>
      </div>
    </div>
    <scroll class="slide-contents-book-list" :top="156" :bottom="41" v-show="!searchVisible">
      <div class="slide-contents-item" v-for="(item, index) in navigation" :key="index">
        <span
          class="slide-contents-item-label"
          :class="{'selected': index == section}"
          :style="contentItemStyle(item)"
          @click="displayContents(item.href)"
        >{{item.label}}</span>
        <span class="slide-contents-item-page">{{item.page}}</span>
      </div>
    </scroll>
    <scroll class="slide-search-list" v-show="searchVisible" :top="66" :bottom="41">
      <div
        class="slide-search-item"
        v-for="(item, index) in searchList"
        :key="index"
        v-html="item.excerpt"
        @click="displayContents(item.cfi, true)"
      ></div>
    </scroll>
  </div>
</template>
<script>
import { ebookMixin } from '@/utils/mixin'
import Scroll from '../common/Scroll'
import { px2rem } from '@/utils/utils'
export default {
  mixins: [ebookMixin],
  components: {
    Scroll
  },
  data() {
    return {
      searchVisible: false,
      searchList: [],
      searchText: ''
    }
  },
  methods: {
    search() {
      if (this.searchText && this.searchText.length > 0) {
        this.doSearch(this.searchText).then(res => {
          this.searchList = res
          this.searchList = res.map(item => {
            item.excerpt = item.excerpt.replace(
              this.searchText,
              `<span class="content-search-text">${this.searchText}</span>`
            )
            return item
          })
        })
      }
    },
    doSearch(q) {
      return Promise.all(
        this.currentBook.spine.spineItems.map(section =>
          section
            .load(this.currentBook.load.bind(this.currentBook))
            .then(section.find.bind(section, q))
            .finally(section.unload.bind(section))
        )
      ).then(results => Promise.resolve([].concat.apply([], results)))
    },
    displayContents(target, highlight = false) {
      this.display(target, () => {
        if (highlight) {
          this.currentBook.rendition.annotations.highlight(target)
        }
        this.setTitleVisible(false)
        this.setSettingVisible(-1)
      })
    },
    contentItemStyle(item) {
      return {
        marginLeft: `${px2rem(item.level * 15)}rem`
      }
    },
    hideSearchPage() {
      this.searchVisible = false
      this.searchList = []
      this.searchText = ''
    },
    showSearchPage() {
      this.searchVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.ebook-slide-contents {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .slide-contents-search-wrapper {
    display: flex;
    height: px2rem(36);
    flex: 0 0 px2rem(36);
    width: 100%;
    margin: px2rem(20) 0 px2rem(10) 0;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-search-input-wrapper {
      flex: 1;
      height: 100%;
      @include center;
      .slide-contents-search-icon {
        @include center;
        flex: 0 0 px2rem(32);
        font-size: px2rem(14);
      }
      .slide-contents-search-input {
        flex: 1;
        height: 100%;
        padding: 0;
        font-size: px2rem(14);
        background: transparent;
        border: none;
        outline: none;
      }
    }
    .slide-contents-search-cancel {
      flex: 0 0 px2rem(50);
      font-size: px2rem(14);
      @include right;
    }
  }
  .slide-contents-book-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(90);
    flex: 0 0 px2rem(90);
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-book-img-wrapper {
      flex: 0 0 px2rem(45);
      @include center;
      .slide-contents-book-img {
        width: px2rem(45);
        height: px2rem(60);
      }
    }
    .slide-contents-book-info-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-contents-book-title {
        font-size: px2rem(14);
        line-height: px2rem(16);
        @include ellipsis2(2)
      }
      .slide-contents-book-author {
        margin-top: px2rem(5);
        // width: 100%;
        @include ellipsis2(1);
        font-size: px2rem(12);
      }
    }
    .slide-contents-book-progress-wrapper {
      flex: 0 0 px2rem(75);
      display: flex;
      flex-direction: column;
      justify-content: center;
      .slide-contents-book-progress {
        font-size: px2rem(14);
      }
      .slide-contents-book-time {
        margin-top: px2rem(5);
        font-size: px2rem(12);
      }
    }
  }
  .slide-contents-book-list {
    padding: 0 px2rem(15);
    box-sizing: border-box;
    font-size: px2rem(14);
    .slide-contents-item {
      display: flex;
      padding: px2rem(15) 0;
      box-sizing: border-box;
      &-label {
        flex: 1;
        @include ellipsis;
      }
      &-page {
        flex: 0 0 px2rem(30);
        font-size: px2rem(10);
        @include right;
      }
    }
  }
  .slide-search-list {
    width: 100%;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-search-item {
      font-size: px2rem(14);
      line-height: px2rem(16);
      padding: px2rem(20) 0;
      box-sizing: border-box;
    }
  }
}
</style>