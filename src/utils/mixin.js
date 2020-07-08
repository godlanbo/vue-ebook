import { mapGetters, mapActions } from 'vuex'
import { themeList, setGlobalCss } from './book'
import { saveLocation } from './localStorage'

export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'titleVisible',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook',
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark',
    ]),
    themeList() {
      return themeList(this)
    }
  },
  methods: {
    ...mapActions([
      'setTitleVisible',
      'setFileName',
      'setSettingVisible',
      'setDefaultFontSize',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setIsPaginating',
      'setCurrentBook',
      'setNavigation',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPagelist',
      'setOffsetY',
      'setIsBookmark',
    ]),
    initGlobalCss() {
      switch (this.defaultTheme) {
        case 'Default':
          setGlobalCss(`${process.env.VUE_APP_RES_BASE_URL}/theme/theme_default.css`)
          break
        case 'Eye':
          setGlobalCss(`${process.env.VUE_APP_RES_BASE_URL}/theme/theme_eye.css`)
          break
        case 'Gold':
          setGlobalCss(`${process.env.VUE_APP_RES_BASE_URL}/theme/theme_gold.css`)
          break
        case 'Night':
          setGlobalCss(`${process.env.VUE_APP_RES_BASE_URL}/theme/theme_night.css`)
          break
        default:
          setGlobalCss(`${process.env.VUE_APP_RES_BASE_URL}/theme/theme_default.css`)
      }
    },
    updateProgress() {
      let currentLocation = this.currentBook.rendition.currentLocation()
      saveLocation(this.fileName, currentLocation.start.cfi)
      return this.setProgress(Math.floor(currentLocation.start.percentage * 100))
    },
    updateSection() {
      let currentLocation = this.currentBook.rendition.currentLocation()
      return this.setSection(currentLocation.start.index)
    }
  }
}