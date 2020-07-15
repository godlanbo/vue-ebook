<template>
  <div
    class="ebook"
    :style="{'top': offsetY > 0 && !titleVisible && bookAvailable ? offsetY + 'px' : '0px'}"
  >
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
    <ebook-bookmark></ebook-bookmark>
  </div>
</template>
<script>
import EbookReader from '../../components/ebook/EbookReader'
import EbookTitle from '../../components/ebook/EbookTitle'
import EbookMenu from '../../components/ebook/EbookMenu'
import EbookBookmark from '../../components/ebook/EbookBookmark'
import { ebookMixin } from '@/utils/mixin'
import { getReadTime, saveReadTime } from '@/utils/localStorage'
export default {
  mixins: [ebookMixin],
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu,
    EbookBookmark
  },
  methods: {
    startLoopReadTime() {
      let readTime = getReadTime(this.fileName)
      if (!readTime) {
        readTime = 0
      }
      this.task = setInterval(() => {
        readTime++
        if (readTime % 30 == 0) {
          saveReadTime(this.fileName, readTime)
        }
      }, 1000)
    }
  },
  mounted() {
    this.startLoopReadTime()
  },
  watch: {
    offsetY(value) {
      if (value == 0) {
        let ebook = document.querySelector('.ebook')
        ebook.style.transition = 'top .3s linear'
        setTimeout(() => {
          ebook.style.transition = ''
        }, 300)
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.task)
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.ebook {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>