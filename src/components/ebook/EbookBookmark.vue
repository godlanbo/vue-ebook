<template>
  <div class="ebook-bookmark" ref="bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper" ref="iconDown">
        <span class="icon-down"></span>
      </div>
      <div class="ebook-bookmark-text">{{text}}</div>
    </div>
    <div class="ebook-bookmark-icon-wrapper" :style="this.isFixed ? fixedStyle : {}">
      <bookmark :color="color" :height="35"></bookmark>
    </div>
  </div>
</template>
<script>
import Bookmark from '../common/Bookmark'
import { ebookMixin } from '@/utils/mixin'
import { realPx, px2rem } from '@/utils/utils'
import { getBookmark, saveBookmark } from '@/utils/localStorage'
const BLUE = '#346cbc'
const WHITE = '#fff'
export default {
  mixins: [ebookMixin],
  components: {
    Bookmark
  },
  computed: {
    height() {
      return realPx(35)
    },
    threshold() {
      return realPx(55)
    },
    fixedStyle() {
      return {
        position: 'fixed',
        top: 0,
        bottom: 'unset'
      }
    }
  },
  methods: {
    addBookmark() {
      this.bookmark = getBookmark(this.fileName)
      if (!this.bookmark) {
        this.bookmark = []
        saveBookmark(this.bookmark)
      }
      const currentLocation = this.currentBook.rendition.currentLocation()
      const cfiBase = currentLocation.start.cfi.replace(/!.*/, '')
      const cfiStart = currentLocation.start.cfi.replace(/.*!/, '').replace(/\)/, '')
      const cfiEnd = currentLocation.end.cfi.replace(/.*!/, '').replace(/\)/, '')
      const cfiRange = `${cfiBase}!,${cfiStart},${cfiEnd})`
      this.currentBook.getRange(cfiRange).then(res => {
        const text = res.toString().replace(/\s\s/g, '')
        this.bookmark.push({
          cfi: currentLocation.start.cfi,
          text
        })
        saveBookmark(this.fileName, this.bookmark)
      })
    },
    removeBookmark() {
      const currentLocation = this.currentBook.rendition.currentLocation()
      const cfi = currentLocation.start.cfi
      this.bookmark = getBookmark(this.fileName)
      if (this.bookmark) {
        saveBookmark(this.fileName, this.bookmark.filter(item => item.cfi !== cfi))
      }
    }
  },
  watch: {
    offsetY(v) {
      if (!this.bookAvailable || this.titleVisible) {
        return
      }
      const iconDown = this.$refs.iconDown
      if (v === 0) {
        setTimeout(() => {
          this.$refs.bookmark.style.top = ''
          iconDown.style.transform = 'rotate(0deg)'
        }, 300)
        if (this.isFixed) {
          this.addBookmark()
          this.setIsBookmark(true)
        } else {
          this.removeBookmark()
          this.setIsBookmark(false)
        }
      } else if (v > 0 && v < this.height) {
        if (this.isBookmark) {
          this.text = this.$t('book.pulldownDeleteMark')
          this.color = BLUE
          this.isFixed = true
        } else {
          this.text = this.$t('book.pulldownAddMark')
          this.color = WHITE
          this.isFixed = false
        }
      } else if (v >= this.height && v < this.threshold) {
        this.$refs.bookmark.style.top = `${-v}px`
        if (this.isBookmark) {
          this.text = this.$t('book.pulldownDeleteMark')
          this.color = BLUE
        } else {
          this.text = this.$t('book.pulldownAddMark')
          this.color = WHITE
        }
        if (iconDown.style.transform === 'rotate(180deg)') {
          iconDown.style.transform = 'rotate(0deg)'
        }
      } else if (v >= this.threshold) {
        this.$refs.bookmark.style.top = `${-v}px`
        if (this.isBookmark) {
          this.text = this.$t('book.releaseDeleteMark')
          this.color = WHITE
          this.isFixed = false
        } else {
          this.text = this.$t('book.releaseAddMark')
          this.color = BLUE
          this.isFixed = true
        }
        if (
          iconDown.style.transform === '' ||
          iconDown.style.transform === 'rotate(0deg)'
        ) {
          iconDown.style.transform = 'rotate(180deg)'
        }
      }
    },
    isBookmark(v) {
      this.isFixed = v
      if (v) {
        this.color = BLUE
      } else {
        this.color = WHITE
      }
    }
  },
  data() {
    return {
      text: '',
      color: WHITE,
      isFixed: false
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.ebook-bookmark {
  position: absolute;
  top: px2rem(-35);
  left: 0;
  z-index: 200;
  height: px2rem(35);
  width: 100%;
  .ebook-bookmark-text-wrapper {
    position: absolute;
    right: px2rem(45);
    bottom: 0;
    display: flex;
    .ebook-bookmark-down-wrapper {
      font-size: px2rem(14);
      color: white;
      transition: transform 0.3s linear;
      @include center;
    }
    .ebook-bookmark-text {
      font-size: px2rem(14);
      color: white;
    }
  }
  .ebook-bookmark-icon-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: px2rem(15);
  }
}
</style>