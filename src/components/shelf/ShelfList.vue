<template>
  <div class="shelf-list" :style="{top : shelfListTop}">
    <transition-group name="list" tag="div" id="shelf-list">
      <div class="shelf-list-item-wrapper" v-for="item in data" :key="item.id">
        <shelf-item :data="item" :style="{height: itemHieght}"></shelf-item>
        <div class="shelf-item-title-wrapper">
          <span class="shelf-item-title title-small">{{item.title}}</span>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
import { storeShelfMixin } from '@/utils/mixin'
import { realPx } from '@/utils/utils'
import ShelfItem from './ShelfItem'
import { px2rem } from '../../utils/utils'
export default {
  mixins: [storeShelfMixin],
  props: {
    top: {
      type: Number,
      default: 94
    },
    data: Array
  },
  components: {
    ShelfItem,
  },
  computed: {
    shelfListTop() {
      return px2rem(this.top) + 'rem'
    },
    itemHieght() {
      return ((window.innerWidth - realPx(80)) / 3 / 250) * 350 + 'px'
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global';
.shelf-list {
  position: absolute;
  left: 0;
  z-index: 100;
  width: 100%;
  #shelf-list {
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    padding: 0 px2rem(10);
    box-sizing: border-box;
    .shelf-list-item-wrapper {
      flex: 0 0 33.33%;
      width: 33.33%;
      padding: px2rem(10);
      box-sizing: border-box;
      &.list-leave-active {
        display: none;
      }
      &.list-move {
        transition: transform .5s;
      }
      .shelf-item-title-wrapper {
        margin-top: px2rem(10);
      }
    }
  }
}
</style>