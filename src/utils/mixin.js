import { mapGetters, mapActions } from 'vuex'
import { themeList, setGlobalCss } from './book'
import { saveLocation, getReadTime, getBookmark, getBookShelf, saveBookShelf } from './localStorage'
import { gotoBookDetail, appendAddToShelf, removeAddFromShelf, computedId } from './store'
import { shelf } from '../api/store'

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
    },
    getSectionName() {
      return (this.navigation && this.navigation[this.section].label) || ''
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
    updateLocation() {
      let currentLocation = this.currentBook.rendition.currentLocation()
      if (currentLocation && currentLocation.start) {
        saveLocation(this.fileName, currentLocation.start.cfi)
        this.setProgress(Math.floor(currentLocation.start.percentage * 100))
        this.setSection(currentLocation.start.index)
        const bookmark = getBookmark(this.fileName)
        if (bookmark) {
          if (bookmark.some(item => item.cfi === currentLocation.start.cfi)) {
            this.setIsBookmark(true)
          } else {
            this.setIsBookmark(false)
          }
        } else {
          this.setIsBookmark(false)
        }
      }
    },
    display(target, cb) {
      if (target) {
        this.currentBook.rendition.display(target).then(() => {
          this.updateLocation()
          if (cb) cb()
        })
      } else {
        this.currentBook.rendition.display().then(() => {
          this.updateLocation()
          if (cb) cb()
        })
      }
    },
    getReadTimeText() {
      return this.$t('book.haveRead').replace('$1', Math.ceil((getReadTime(this.fileName) || 0) / 60))
    },
  }
}
export const storeHomeMixin = {
  computed: {
    ...mapGetters([
      'offsetY',
      'hotSearchOffsetY',
      'flapCardVisible'
    ])
  },
  methods: {
    ...mapActions([
      'setOffsetY',
      'setHotSearchOffsetY',
      'setFlapCardVisible'
    ]),
    showBookDetail(book) {
      gotoBookDetail(this, book)
    }
  },
}
export const storeShelfMixin = {
  computed: {
    ...mapGetters([
      'isEditMode',
      'shelfList',
      'shelfSelected',
      'shelfTitleVisible',
      'offsetY',
      'shelfCategory',
      'currentType'
    ])
  },
  methods: {
    ...mapActions([
      'setIsEditMode',
      'setShelfList',
      'setShelfSelected',
      'setShelfTitleVisible',
      'setOffsetY',
      'setShelfCategory',
      'setCurrentType'
    ]),
    showBookDetail(book) {
      gotoBookDetail(this, book)
    },
    getCategoryList(title) {
      this.getShelfList().then(() => {
        let categoryList = this.shelfList.filter(book => book.type === 2 && book.title === title)[0]
        this.setShelfCategory(categoryList)
      })
    },
    getShelfList() {
      let shelfList = getBookShelf()
      if (!shelfList) {
        shelf().then((res) => {
          if (res.status === 200) {
            shelfList = appendAddToShelf(res.data.bookList)
            saveBookShelf(shelfList)
            return this.setShelfList(shelfList)
          }
        })
      } else {
        return this.setShelfList(shelfList)
      }
    },
    moveOutOfGroup(cb) {
      this.setShelfList(
        this.shelfList.map((book) => {
          if (book.itemList && book.type === 2) {
            book.itemList = book.itemList.filter((subBook) => {
              return !subBook.selected
            })
          }
          return book
        })
      )
        .then(() => {
          let list = removeAddFromShelf(this.shelfList)
          // debugger
          list = list.concat(this.shelfSelected)
          list = appendAddToShelf(list)
          list = computedId(list)
          return this.setShelfList(list)
        })
        .then(() => {
          this.simpleToast(this.$t('shelf.moveBookOutSuccess'))
          if (cb) cb()
        })
    }
  }
}