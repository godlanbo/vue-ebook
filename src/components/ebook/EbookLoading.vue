<template>
  <div class="ebook-loading">
    <div class="ebook-loading-wrapper">
      <div class="ebook-loading-item" v-for="(item, index) in data" :key="index">
        <div class="ebook-loading-line-wrapper" v-for="(subItem, subIndex) in item" :key="subIndex">
          <div class="ebook-loading-line"></div>
          <div class="ebook-loading-mask"></div>
        </div>
      </div>
      <div class="ebook-loading-center"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        [{}, {}, {}],
        [{}, {}, {}]
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';
@keyframes line {
  0%, 33% {
    flex: 0 0 0;
  }
  66%, 100% {
    flex: 1;
  }
}
@keyframes mask {
  0%, 33% {
    flex: 1;
  }
  66%, 100% {
    flex: 0 0 0;
  }
}
.ebook-loading {
  position: relative;
  width: px2rem(63);
  border: px2rem(1.5) solid #d7d7d7;
  height: px2rem(40);
  border-radius: px2rem(3);
  .ebook-loading-wrapper {
    width: 100%;
    height: 100%;
    @include center;
    .ebook-loading-item {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      &:nth-child(1) {
        .ebook-loading-line-wrapper {
          &:nth-child(1) {
            .ebook-loading-mask, .ebook-loading-line {
              animation-delay: -.5s;
            }
          }
          &:nth-child(2) {
            .ebook-loading-mask, .ebook-loading-line {
              animation-delay: -.25s;
            }
          }
          &:nth-child(3) {
            .ebook-loading-mask, .ebook-loading-line {
              animation-delay: -.1s;
            }
          }
        }
      }
      &:nth-child(2) {
        .ebook-loading-line-wrapper {
          &:nth-child(2) {
            .ebook-loading-mask, .ebook-loading-line {
              animation-delay: .2s;
            }
          }
          &:nth-child(3) {
            .ebook-loading-mask, .ebook-loading-line {
              animation-delay: .4s;
            }
          }
        }
      }
      .ebook-loading-line-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        padding: 0 px2rem(7);
        box-sizing: border-box;
        .ebook-loading-line {
          animation: line 1s linear infinite alternate;
          height: px2rem(1.5);
          background: #d7d7d7;
        }
        .ebook-loading-mask {
          animation: mask 1s linear infinite alternate;
          height: px2rem(1.5);
        }
      }
    }
    .ebook-loading-center {
      position: absolute;
      top: 0;
      left: 50%;
      height: 100%;
      background: #d7d7d7;
      width: px2rem(1.5);
      transform: (0 -50%);
    }
  }
}
</style>