<template>
  <div
    class="Container card__box mx-auto position-relative zoom-in"
    :style="{
      background: `url('${item.Picture.PictureUrl1}') #e0e0e0 no-repeat center center`,
    }"
    :title="item.Picture.PictureDescription1"
  >
    <div
      class="
        card__pin
        position-absolute
        top-0
        end-0
        d-flex
        justify-content-center
        align-items-center
      "
      @click.stop.prevent="toggleColect(item)"
      @click="showPinFill = !showPinFill"
    >
      <i
        class="bi"
        :class="[showPinFill ? 'bi-pin-angle-fill' : 'bi-pin-angle']"
        style="font-size: 22px"
      />
    </div>
    <div class="card__text position-absolute bottom-0">
      <h4 class="card__text__name text-truncate">{{ item.Name }}</h4>
      <span class="card__text__location d-block text-truncate"
        ><i class="bi bi-geo-alt mx-1" />{{ item.Address }}</span
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  &__box {
    width: 245px;
    height: 280px;
    border-radius: 15px;
    position: relative;
    overflow: hidden;
  }
  &__pin {
    z-index: 2;
    background-color: $Off_White;
    width: 60px;
    height: 60px;
    border-radius: 0 0 0 20px;
    pointer-events: auto;
    overflow: hidden;
    &:hover .bi {
      transform: scale(1.4);
    }
    .bi {
      transform: scale(1);
      transition: transform 0.4s ease;
      color: $Title_Active;
    }
  }
  &__text {
    width: 245px;
    z-index: 1;
    color: $Off_White;
    text-align: left;
    padding: 0 24px 20px 20px;
    &__name {
      font-weight: bold !important;
    }
    &__location {
      font-size: $Text_XSmall;
    }
  }
}
.zoom-in {
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: inherit;
    transform-origin: center;
    transition: transform 0.4s ease-in-out;
  }
  &:focus,
  &:hover {
    &::after {
      transform: scale(1.1);
    }
  }
}
</style>

<script>
export default {
  name: "Card",
  data() {
    return {
      showPinFill: false,
    };
  },
  props: {
    item: {},
  },
  created() {
    this.showPinFill = this.isCollected(this.item);
  },
};
</script>
