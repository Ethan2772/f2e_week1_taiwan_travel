<template>
  <div
    class="Container card__box position-relative zoom-in"
    :style="{
      background: `url('${item.Picture.PictureUrl1}') no-repeat center center`,
    }"
  >
    <div class="card__text position-absolute bottom-0">
      <h4 class="card__text__name text-truncate">{{ item.Name }}</h4>
      <div class="card__text__location">
        <i class="bi bi-geo-alt"></i>
        <span class="ms-1">{{ item.City }}</span>
        <i class="bi bi-dot"></i>
        <span>{{ item.Address.substr(6, 3) }}</span>
      </div>
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
    background-color: #fff;
  }
  &__text {
    z-index: 1;
    color: $Off_White;
    text-align: left;
    padding: 0 24px 20px 20px;
    &__name {
      width: 200px;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
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
    background-size: cover;
    transform-origin: center;
    transition: transform .4s ease-in-out;
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
  props: {
    item: {},
  },
};
</script>
