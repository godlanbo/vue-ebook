<template>
  <div class="store-shelf">
    <shelf-title :title="$t('shelf.title')"></shelf-title>
    <scroll
      class="store-shelf-scroll-wrapper"
      :top="0"
      :bottom="scrollBottom"
      @onScroll="onScroll"
      ref="scroll"
    >
      <shelf-search></shelf-search>
      <shelf-list :data="shelfList"></shelf-list>
    </scroll>
    <shelf-footer></shelf-footer>
  </div>
</template>
<script>
import { storeShelfMixin } from '@/utils/mixin'
import ShelfTitle from '../../components/shelf/ShelfTitle'
import ShelfSearch from '../../components/shelf/ShelfSearch'
import ShelfList from '../../components/shelf/ShelfList'
import ShelfFooter from '../../components/shelf/ShelfFooter'
import Scroll from '../../components/common/Scroll'
export default {
  mixins: [storeShelfMixin],
  components: {
    ShelfTitle,
    ShelfSearch,
    Scroll,
    ShelfList,
    ShelfFooter,
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
  mounted() {
    this.getShelfList()
    this.setShelfCategory([])
    this.setCurrentType(1)
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
}
</style>