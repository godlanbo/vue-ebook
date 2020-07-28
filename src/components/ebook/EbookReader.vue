<template>
  <div class="ebook-reader">
    <div id="read"></div>
    <div class="ebook-reader-mask" @click="onMaskClick" @touchmove="move" @touchend="moveEnd"></div>
  </div>
</template>
<script>
import Epub from 'epubjs'
import { ebookMixin } from '@/utils/mixin'
// import { themeList } from '@/utils/book'
import {
  getFontFamily,
  saveFontFamily,
  getFontSize,
  saveFontSize,
  getTheme,
  saveTheme,
  getLocation
} from '@/utils/localStorage'
import { flatten } from '@/utils/book'
global.ePub = Epub
export default {
  mixins: [ebookMixin],
  data() {
    return {
      task: null
    }
  },
  mounted() {
    const fileName = this.$route.params.fileName.split('|').join('/')
    this.setFileName(fileName).then(() => {
      this.initEpub()
    })
  },
  methods: {
    move(e) {
      if (this.task) {
        return
      }
      this.task = setTimeout(() => {
        let offsetY = 0
        if (this.firstOffsetY) {
          offsetY = e.changedTouches[0].clientY - this.firstOffsetY
        } else {
          this.firstOffsetY = e.changedTouches[0].clientY
        }
        this.setOffsetY(offsetY)
        e.stopPropagation()
        e.preventDefault()
        this.task = null
      }, 30)
    },
    moveEnd(e) {
      this.setOffsetY(0)
      this.firstOffsetY = 0
    },
    onMaskClick(e) {
      let width = window.innerWidth
      let offsetX = e.offsetX
      if (offsetX > 0 && offsetX < 0.3 * width) {
        this.prevPage()
      } else if (offsetX > 0.7 * width && offsetX < width) {
        this.nextPage()
      } else {
        this.toggleTitleAndMenu()
      }
    },
    prevPage() {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.updateLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.updateLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    toggleTitleAndMenu() {
      if (this.titleVisible) {
        this.setSettingVisible(-1)
        this.setFontFamilyVisible(false)
      }
      this.setTitleVisible(!this.titleVisible)
    },
    hideTitleAndMenu() {
      this.setTitleVisible(false)
      this.setSettingVisible(-1)
      this.setFontFamilyVisible(false)
    },
    initFontSize() {
      let fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        this.rendition.themes.fontSize(fontSize)
        this.setDefaultFontSize(fontSize)
      }
    },
    initFontFamily() {
      let font = getFontFamily(this.fileName)
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily)
      } else {
        this.rendition.themes.font(font)
        this.setDefaultFontFamily(font)
      }
    },
    initTheme() {
      let defaultTheme = getTheme(this.fileName)
      if (!defaultTheme) {
        defaultTheme = 'Default'
        saveTheme(this.fileName, defaultTheme)
      }
      this.setDefaultTheme(defaultTheme).then(() => {
        this.initGlobalCss()
      })
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style)
      })
      this.rendition.themes.select(defaultTheme)
    },
    initProgressAndSection() {
      this.book.ready
        .then(() => {
          return this.book.locations.generate(
            750 * (innerWidth / 350) * (getFontSize(this.fileName) / 16)
          )
        })
        .then(locations => {
          this.navigation.forEach(nav => {
            nav.pageList = []
          })
          locations.forEach(item => {
            let loc = item.match(/\[(.*)\]!/)[1]
            this.navigation.forEach(nav => {
              let href = nav.href.match(/^(.*)\.html/)[1]
              if (href === loc) {
                nav.pageList.push(loc)
              }
            })
          })
          let currentPage = 1
          this.navigation.forEach((nav, index) => {
            if (index == 0) {
              nav.page = 1
            } else {
              nav.page = currentPage
            }
            currentPage += nav.pageList.length + 1
          })
          this.updateLocation()
          this.setBookAvailable(true)
        })
    },
    initGesture() {
      this.rendition.on('touchstart', event => {
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend', event => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        const time = event.timeStamp - this.touchStartTime
        if (time < 500 && offsetX > 40) {
          this.prevPage()
        } else if (time < 500 && offsetX < -40) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
        // event.preventDefault()
        event.stopPropagation()
      })
    },
    parseBook() {
      this.book.loaded.cover
        .then(cover => {
          return this.book.archive.createUrl(cover)
        })
        .then(url => {
          this.setCover(url)
        })
      this.book.loaded.metadata.then(metadata => {
        this.setMetadata(metadata)
      })
      this.book.loaded.navigation.then(nav => {
        let navigation = flatten(nav.toc)
        function find(item, level = 0) {
          return item.parent
            ? find(
                navigation.filter(navItem => navItem.id == item.parent)[0],
                level + 1
              )
            : level
        }
        navigation.forEach(navItem => {
          navItem.level = find(navItem)
        })
        this.setNavigation(navigation)
      })
    },
    initBookInfo() {
      this.initFontSize()
      this.initFontFamily()
      this.initTheme()
      this.initProgressAndSection()
    },
    initEpub() {
      const resBaseUrl = process.env.VUE_APP_RES_BASE_URL
      const epubUrl = `${resBaseUrl}/epub/${this.fileName}.epub`
      this.book = new Epub(epubUrl)
      this.setCurrentBook(this.book)
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default'
      })

      let location = getLocation(this.fileName)
      this.display(location, () => {
        this.initBookInfo()
      })
      this.parseBook()

      // this.initGesture()
      this.rendition.hooks.content.register(contents => {
        contents.addStylesheet(
          `${process.env.VUE_APP_RES_BASE_URL}/fonts/cabin.css`
        )
        contents.addStylesheet(
          `${process.env.VUE_APP_RES_BASE_URL}/fonts/daysOne.css`
        )
        contents.addStylesheet(
          `${process.env.VUE_APP_RES_BASE_URL}/fonts/montserrat.css`
        )
        contents.addStylesheet(
          `${process.env.VUE_APP_RES_BASE_URL}/fonts/tangerine.css`
        )
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.ebook-reader {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .ebook-reader-mask {
    position: absolute;
    top: 0;
    left: 0;
    background: transparent;
    width: 100%;
    height: 100%;
  }
}
</style>