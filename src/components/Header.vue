<template>
  <div class="header__box position-relative">
    <img
      class="header__image"
      :class="{ blur: hasPicture }"
      :src="hasPicture ? Picture.PictureUrl1 : require('@/assets/banner.png')"
      :alt="!hasPicture ? Picture.PictureDescription1 : 'page banner'"
      width="1480"
      height="400"
      style="object-fit: cover"
    />
    <img
      v-if="hasPicture"
      :src="Picture.PictureUrl1"
      :alt="Picture.PictureDescription1"
      width="1480"
      height="400"
      class="position-absolute top-50 start-50 translate-middle"
      style="object-fit: contain"
    />
    <div class="circle__orange circle__orange1" style="opacity: 0.9">
      <div class="logo">
        <img
          src="@/assets/lets_go.png"
          width="120"
          height="90"
          alt="Let's go logo"
        />
      </div>
    </div>
    <router-link :to="{ name: 'Home' }" v-slot="{ isExactActive, navigate }">
      <div
        class="circle__orange circle__orange2 shadow"
        @click="navigate"
        v-show="!isExactActive"
      >
        <i class="bi bi-house-door"></i>
      </div>
    </router-link>
    <router-link
      :to="{ name: 'Collection' }"
      v-slot="{ isExactActive, navigate }"
    >
      <div
        class="circle__orange circle__orange2 shadow"
        @click="navigate"
        v-show="!isExactActive"
      >
        <i class="bi bi-flag"></i>
        <div class="circle__red">{{ saveItems }}</div>
      </div>
    </router-link>
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
    Picture: {
      default() {
        return {};
      },
    },
  },
  computed: {
    saveItems() {
      return this.$store.getters.conutCollection;
    },
    hasPicture() {
      return Object.values(this.Picture).length;
    },
  },
};
</script>

<style lang="scss" scoped>
.header__box {
  .header__image {
    width: 100%;
  }
  max-height: 400px;
  margin-bottom: 102px;
  .circle__orange {
    position: absolute;
    background-color: $Secondary;
    border-radius: 50%;
    &1 {
      @media (max-width: 411px) {
        display: none !important;
      }
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
      cursor: pointer;
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
      @media (max-width: 576px) {
        display: none !important;
      }
      left: 50%;
      transform: translateX(-50%);
      width: 508px;
      height: 120px;
      top: 140px;
    }
    &__bottomCenter {
      left: 50%;
      transform: translateX(-50%);
      height: 49px;
      bottom: -25px;
    }
    &__bottomRight {
      right: 15%;
      height: 60px;
      bottom: -30px;
    }
  }
  .blur {
    transform: scale(1.1, 1);
    -webkit-filter: blur(8px);
    -moz-filter: blur(8px);
    -o-filter: blur(8px);
    -ms-filter: blur(8px);
    filter: blur(8px);
  }
}
</style>
