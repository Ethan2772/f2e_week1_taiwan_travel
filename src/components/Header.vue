<template>
  <div class="header-box position-relative" :style ="{backgroundImage:`url( ${require('@/assets/'+imgPath)} )`}">
    <div class="circle__orange circle__orange1">
      <div class="logo">
        <img src="../assets/lets_go.png" width="120" height="90" alt="Let's go">
      </div>
    </div>
    <div class="circle__orange circle__orange2">
      <i class="bi bi-flag"></i>
      <div class="circle__red">{{ saveItems }}</div>
    </div>
    <div class="slot slot__middle">
      <slot name="middle" />
    </div>
    <div class="slot slot__bottomCenter">
      <slot name="bottomCenter" />
    </div>
    <div class="slot slot__bottomRight">
      <slot name="bottomRight" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    imgPath: {
      type: String,
      default: "banner.png"
    }
  },
  data() {
    return {
      saveItems: "2",
    };
  },
};
</script>

<style lang="scss" scoped>
.header-box {
  background-size: cover;
  height: 400px;
  margin-bottom: 102px;
  .circle__orange {
    position: absolute;
    background-color: $Secondary;
    border-radius: 50%;
    &1 {
      width: 280px;
      height: 280px;
      left: -40px;
      top: -50px;
      .logo {
        position: absolute;
        left: 80px;
        top: 95px;
      }
    }
    &2 {
      width: 64px;
      height: 64px;
      top: 98px;
      right: 48px;
      > i {
        color: $Off_White;
        font-size: 25px;
        line-height: 64px;
      }
      .circle__red {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background-color: $Error;
        position: absolute;
        top: -7px;
        right: -7px;
        line-height: 28px;
        color: $Off_White;
        font-weight: bold;
      }
    }
  }
  .slot {
    position: absolute;
    &__middle {
      left: calc(50% + 15px);
      transform: translateX(-50%);
      width: 508px;
      height: 120px;
      top: 140px;
    }
    &__bottomCenter {
      left: calc(50% + 15px);
      transform: translateX(-50%);
      height: 49px;
      bottom: -25px;
    }
    &__bottomRight {
      left: calc(85% + 15px);
      transform: translateX(-50%);
      height: 49px;
      bottom: -25px;
    }
  }
}
</style>
