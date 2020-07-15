<template>
  <div class="bookmark" :style="style"></div>
</template>
<script>
import { px2rem } from '@/utils/utils'
export default {
  props: {
    width: {
      type: Number,
      default: 20
    },
    height: {
      type: Number,
      default: 60
    },
    color: {
      type: String,
      default: 'white'
    }
  },
  computed: {
    style() {
      return {
        borderColor: `${this.color} ${this.color} transparent ${this.color}`,
        borderWidth: `${px2rem(this.width / 2)}rem`,
        borderTopWidth: `${px2rem(this.height - this.width / 2)}rem`
      }
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.bookmark {
  width: 0;
  height: 0;
  // border: px2rem(10);
  // border-top: px2rem(50);
  border-style: solid;
  // border-color: white white transparent white;
}
</style>