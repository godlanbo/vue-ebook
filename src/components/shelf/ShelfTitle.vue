<template>
  <transition name="fade">
    <div class="shelf-title" v-show="shelfTitleVisible" :class="{'hide-shadow' : ifHideShadow}">
      <div class="shelf-title-text-wrapper">
        <span class="shelf-title-text">{{title}}</span>
        <span class="shelf-title-sub-text" v-show="isEditMode">{{selectedText}}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-left" v-if="currentType === 1">
        <span class="shelf-title-btn-text" @click="clearCache">{{$t('shelf.clearCache')}}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-left" v-if="showBack">
        <span class="icon-back" @click="back"></span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-right" v-if="showEdit">
        <span
          class="shelf-title-btn-text"
          @click="onEditClick"
        >{{isEditMode ? $t('shelf.cancel') : $t('shelf.edit')}}</span>
      </div>
      <div
        class="shelf-title-btn-wrapper"
        :class="{'shelf-right' : changeGroupRight, 'shelf-left' : changeGroupLeft}"
        v-if="showChangeGroup"
      >
        <span class="shelf-title-btn-text" @click="changeGroup">{{$t('shelf.editGroup')}}</span>
      </div>
    </div>
  </transition>
</template>
<script>
import { storeShelfMixin } from '@/utils/mixin'
import { clearLocalForage } from '../../utils/localForage'
import { clearLocalStorage, saveBookShelf } from '../../utils/localStorage'
export default {
  mixins: [storeShelfMixin],
  props: {
    title: String,
  },
  data() {
    return {
      ifHideShadow: true,
    }
  },
  watch: {
    offsetY(v) {
      if (v > 0) {
        this.ifHideShadow = false
      } else {
        this.ifHideShadow = true
      }
    },
  },
  computed: {
    emptyCategory() {
      return (
        !this.shelfCategory ||
        !this.shelfCategory.itemList ||
        this.shelfCategory.itemList.length === 0
      )
    },
    showEdit() {
      return this.currentType === 1 || !this.emptyCategory
    },
    showBack() {
      return this.currentType === 2 && !this.isEditMode
    },
    showChangeGroup() {
      return this.currentType === 2 && (this.isEditMode || this.emptyCategory)
    },
    changeGroupRight() {
      return this.emptyCategory
    },
    changeGroupLeft() {
      return !this.emptyCategory
    },
    selectedText() {
      if (this.shelfSelected.length === 0) {
        return this.$t('shelf.selectBook')
      } else if (this.shelfSelected.length === 1) {
        return this.$t('shelf.haveSelectedBook').replace('$1', 1)
      } else {
        return this.$t('shelf.haveSelectedBooks').replace(
          '$1',
          this.shelfSelected.length
        )
      }
    },
  },
  methods: {
    hidePopup() {
      this.popupMenu.hide()
    },
    onComplete() {
      this.hidePopup()
      this.setIsEditMode(false)
      this.setShelfList(
        this.shelfList.filter((book) => book.id !== this.shelfCategory.id)
      ).then(() => {
        saveBookShelf(this.shelfList)
        this.$router.go(-1)
      })
    },
    deleteGroup() {
      if (!this.emptyCategory) {
        this.setShelfSelected(this.shelfCategory.itemList)
        this.moveOutOfGroup(this.onComplete)
      } else {
        this.onComplete()
      }
    },
    showDeleteGroup() {
      this.hidePopup()
      setTimeout(() => {
        this.popupMenu = this.popup({
          title: this.$t('shelf.deleteGroupTitle'),
          btn: [
            this.createPopupBtn(
              this.$t('shelf.confirm'),
              () => {
                this.deleteGroup()
              },
              'danger'
            ),
            this.createPopupBtn(this.$t('shelf.cancel'), this.hidePopup),
          ],
        }).show()
      }, 200)
    },
    changeGroupName() {
      this.hidePopup()
      this.dialog({
        showNewGroup: true,
        groupName: this.shelfCategory.title,
      }).show()
    },
    createPopupBtn(text, onClick, type = 'normal') {
      return {
        text,
        type,
        click: onClick,
      }
    },
    changeGroup() {
      this.popupMenu = this.popup({
        btn: [
          this.createPopupBtn(
            this.$t('shelf.editGroupName'),
            this.changeGroupName
          ),
          this.createPopupBtn(
            this.$t('shelf.deleteGroup'),
            this.showDeleteGroup,
            'danger'
          ),
          this.createPopupBtn(this.$t('shelf.cancel'), this.hidePopup),
        ],
      }).show()
    },
    back() {
      this.setIsEditMode(false)
      this.$router.go(-1)
    },
    onEditClick() {
      if (!this.isEditMode) {
        this.setShelfSelected([])
        this.shelfList.forEach((item) => {
          item.selected = false
          if (item.itemList) {
            item.itemList.forEach((subItem) => {
              subItem.selected = false
            })
          }
        })
      }
      this.setIsEditMode(!this.isEditMode)
    },
    clearCache() {
      clearLocalForage()
      clearLocalStorage()
      this.setShelfSelected([])
      this.setShelfList([])
      this.getShelfList()
      this.simpleToast(this.$t('shelf.clearCacheSuccess'))
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global';
.shelf-title {
  z-index: 130;
  position: relative;
  width: 100%;
  height: px2rem(42);
  background: white;
  box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, 0.1);
  &.hide-shadow {
    box-shadow: none;
  }
  .shelf-title-text-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(42);
    color: #333;
    @include columnCenter;
    .shelf-title-text {
      font-size: px2rem(16);
      font-weight: bold;
      line-height: px2rem(22);
    }
    .shelf-title-sub-text {
      font-size: px2rem(12);
    }
  }
  .shelf-title-btn-wrapper {
    position: absolute;
    top: 0;
    box-sizing: border-box;
    height: 100%;
    @include center;
    .shelf-title-btn-text {
      font-size: px2rem(16);
      color: #666;
    }
    .icon-back {
      font-size: px2rem(20);
      color: #666;
    }
    &.shelf-left {
      left: 0;
      padding-left: px2rem(15);
    }
    &.shelf-right {
      right: 0;
      padding-right: px2rem(15);
    }
  }
}
</style>