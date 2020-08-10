<template>
  <div class="shelf-item-category">
    <div class="shelf-itemcategory-list" v-if="data.itemList.length > 0">
      <div class="shelf-item-category-item" v-for="(item, index) in data.itemList" :key="item.id">
        <img class="shelf-item-category-item-img" :src="item.cover" v-if="index < 9" />
      </div>
    </div>
    <div class="shelf-item-category-bg" v-else>
      <span class="icon-book2"></span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: Object,
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global';
.shelf-item-category {
  width: 100%;
  height: 100%;
  .shelf-itemcategory-list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    padding: px2rem(2);
    box-sizing: border-box;
  }
  .shelf-item-category-bg {
    width: 100%;
    height: 100%;
    @include center;
    color: #ccc;
    font-size: px2rem(30);
    background: white;
  }
  .shelf-item-category-item {
    flex: 0 0 33.33%;
    width: 33.33%;
    height: 33.33%;
    padding: px2rem(2);
    box-sizing: border-box;
    .shelf-item-category-item-img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>