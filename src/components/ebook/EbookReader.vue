<template>
  <div class="ebook-reader">
    <div id="read"></div>
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
global.ePub = Epub
export default {
  mixins: [ebookMixin],
  mounted() {
    const fileName = this.$route.params.fileName.split('|').join('/')
    this.setFileName(fileName).then(() => {
      this.initEpub()
    })
  },
  methods: {
    prevPage() {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.updateProgress()
          this.updateSection()
        })
        this.hideTitleAndMenu()
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.updateProgress()
          this.updateSection()
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
        .then(res => {
          this.updateProgress()
          return this.updateSection()
        })
        .then(() => {
          this.setBookAvailable(true)
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
      if (location) {
        this.rendition.display(location).then(() => {
          this.initBookInfo()
        })
      } else {
        this.rendition.display().then(() => {
          this.initBookInfo()
        })
      }

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
</style>