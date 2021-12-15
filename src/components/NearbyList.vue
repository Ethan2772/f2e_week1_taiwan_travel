<template>
  <div class="nearby__list">
    <div
      class="
        nearby__list__header
        d-flex
        align-items-center
        justify-content-between
      "
    >
      <h3>附近{{ name }}</h3>
      <div class="btn btn-explore-more">
        更多{{ name }}<i class="bi bi-caret-right-fill"></i>
      </div>
    </div>
    <div class="nearby__list__body row justify-content-center">
      <router-link
        v-for="item in list"
        :key="item.ID"
        :to="{ name: 'Tourism', params: { id: item.ID } }"
        class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2"
      >
        <Card :item="item" />
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nearby__list {
  margin-bottom: 60px;
  &__header {
    color: $Title_Active;
    h3 {
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 0.1em;
    }
    .btn-explore-more {
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>

<script>
import Card from "@/components/Card.vue";

export default {
  name: "NearbyList",
  components: { Card },
  props: {
    name: {},
    list: {},
  },
};
</script>
