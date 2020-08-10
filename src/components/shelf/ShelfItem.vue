<template>
  <div class="shelf-item" :class="{'shelf-item-shadow' : data.type !== 3}" @click="onItemClick">
    <component
      class="shelf-item-comp"
      :class="{'is-edit' : data.type === 2 && isEditMode }"
      :is="itemType"
      :data="data"
    ></component>
    <div
      class="icon-selected"
      :class="{'is-selected' : data.selected}"
      v-show="isEditMode && data.type === 1"
    ></div>
  </div>
</template>
<script>
import { storeShelfMixin } from '@/utils/mixin'
import ShelfItemBook from './ShelfItemBook'
import ShelfItemAdd from './ShelfItemAdd'
import ShelfItemCategory from './ShelfItemCategory'
import { gotoStoreHome } from '@/utils/store'
export default {
  mixins: [storeShelfMixin],
  data() {
    return {
      book: ShelfItemBook,
      add: ShelfItemAdd,
      category: ShelfItemCategory,
    }
  },
  props: {
    data: Object,
  },
  computed: {
    itemType() {
      if (this.data.type === 1) {
        return this.book
      } else if (this.data.type === 2) {
        return this.category
      } else {
        return this.add
      }
    },
  },
  methods: {
    onItemClick() {
      if (this.isEditMode) {
        this.data.selected = !this.data.selected
        if (this.data.selected) {
          this.shelfSelected.pushWithoutDuplicate(this.data)
        } else {
          this.setShelfSelected(this.shelfSelected.filter(item => item.id !== this.data.id))
        }
      } else {
        if (this.data.type === 1) {
          this.showBookDetail(this.data)
        } else if (this.data.type === 2) {
          this.$router.push({
            path: '/store/category',
            query: {
              title: this.data.title
            }
          })
        } else {
          gotoStoreHome(this)
        }
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global';
.shelf-item {
  position: relative;
  width: 100%;
  height: 100%;
  .shelf-item-comp {
    opacity: 1;
    &.is-edit {
      opacity: 0.5;
    }
  }
  &.shelf-item-shadow {
    box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(200, 200, 200, 0.3);
  }
  .icon-selected {
    position: absolute;
    bottom: px2rem(2);
    right: px2rem(2);
    font-size: px2rem(18);
    color: rgba(0, 0, 0, 0.4);
    &.is-selected {
      color: $color-blue;
    }
  }
}
</style>