<template>
  <div class="store-shelf">
    <shelf-title :title="shelfCategory.title"></shelf-title>
    <scroll
      class="store-shelf-scroll-wrapper"
      :top="0"
      :bottom="scrollBottom"
      @onScroll="onScroll"
      ref="scroll"
      v-if="ifCategoryEmpty"
    >
      <shelf-list :top="42" :data="shelfCategory.itemList"></shelf-list>
    </scroll>
    <div class="store-shelf-empty-view" v-else>
      {{$t('shelf.groupNone')}}
    </div>
    <shelf-footer></shelf-footer>
  </div>
</template>
<script>
import { storeShelfMixin } from '@/utils/mixin'
import ShelfTitle from '../../components/shelf/ShelfTitle'
import ShelfList from '../../components/shelf/ShelfList'
import ShelfFooter from '../../components/shelf/ShelfFooter'
import Scroll from '../../components/common/Scroll'
export default {
  mixins: [storeShelfMixin],
  components: {
    ShelfTitle,
    Scroll,
    ShelfList,
    ShelfFooter,
  },
  computed: {
    ifCategoryEmpty() {
      return this.shelfCategory.itemList && this.shelfCategory.itemList.length > 0
    }
  },
  watch: {
    isEditMode(v) {
      this.scrollBottom = v ? 48 : 0
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
  },
  data() {
    return {
      scrollBottom: 0,
    }
  },
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY)
    },
  },
  created() {
    this.getCategoryList(this.$route.query.title)
    this.setCurrentType(2)
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global';
.store-shelf {
  position: relative;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: white;
  .store-shelf-scroll-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 101;
  }
  .store-shelf-empty-view {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    @include center;
    font-size: px2rem(15);
    color: #333;
  }
}
</style>