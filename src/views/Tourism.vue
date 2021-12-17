<template>
  <div>
    <Header class="mb-5">
      <template #bottomRight class="d-flex">
        <div class="d-flex">
          <div
            class="
              button
              d-flex
              justify-content-center
              align-items-center
              rounded-circle
              bg-white
              shadow
            "
          >
            <i class="bi bi-map" style="font-size: 22px"></i>
          </div>
          <div
            class="
              button
              d-flex
              justify-content-center
              align-items-center
              rounded-circle
              bg-white
              shadow
              ms-3
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
        </div>
      </template>
    </Header>
    <div class="container mb-5">
      <div class="article row justify-content-center mb-5">
        <div class="col-xl-11 col-lg-9">
          <div
            class="article__title d-flex align-items-center mb-5"
            style="height: 90px"
          >
            <router-link :to="{ name: 'Home' }" class="h-100">
              <div
                class="
                  btn btn-previous-page
                  d-flex
                  align-items-center
                  h-100
                  p-0
                "
              >
                <i
                  class="bi bi-chevron-left"
                  style="font-size: 20px; font-weight: 700"
                ></i>
              </div>
            </router-link>
            <h1 class="ms-3">{{ item.Name }}</h1>
          </div>
          <div class="row">
            <div class="col-lg-7">
              <div class="article__text">
                <p>{{ item.Description }}</p>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="article__info">
                <div
                  class="shadow-sm p-4 mb-3 bg-white d-flex"
                  :class="{ 'd-none': !item.Address }"
                  style="border-radius: 20px"
                >
                  <i class="bi bi-geo-alt-fill d-block me-3"></i>
                  {{ item.Address }}
                </div>
                <div
                  class="shadow-sm p-4 mb-3 bg-white d-flex"
                  :class="{ 'd-none': !item.Phone }"
                  style="border-radius: 20px"
                >
                  <i class="bi bi-telephone-fill d-block me-3"></i>
                  {{ formatNumber }}
                </div>
                <div
                  class="shadow-sm p-4 mb-3 bg-white d-flex"
                  :class="{ 'd-none': !item.OpenTime }"
                  style="border-radius: 20px"
                >
                  <i class="bi bi-clock-fill d-block me-3"></i>
                  {{ item.OpenTime }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NearbyList
        v-for="(type, index) in types"
        :key="type.en"
        :name="type.ch"
        :list="nearbyLists[index]"
        :city="item.City"
      />
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.btn-previous-page {
  color: $Title_Active;
  &:hiver {
    background-color: $Title_Active;
    color: $Off_White;
  }
}
.article {
  color: $Title_Active;
  text-align: left;
  &__title h1 {
    font-weight: 700;
    font-size: 40px;
  }
  &__text p {
    font-size: $Text_Medium;
    font-weight: 400;
    line-height: 36px;
  }
  &__info {
    font-weight: bold;
  }
}
.button {
  width: 60px;
  height: 60px;
  cursor: pointer;
  &:hover .bi {
    transform: scale(1.4);
  }
  .bi {
    transform: scale(1);
    transition: transform 0.4s ease;
    color: $Title_Active;
  }
}
</style>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import NearbyList from "@/components/NearbyList.vue";

export default {
  name: "Tourism",
  components: {
    Header,
    Footer,
    NearbyList,
  },
  data() {
    return {
      item: {},
      nearbyLists: [],
      showPinFill: false,
      types: [
        { ch: "景點", en: "ScenicSpot" },
        { ch: "活動", en: "Activity" },
        { ch: "美食", en: "Restaurant" },
        { ch: "旅宿", en: "Hotel" },
      ],
    };
  },
  created() {
    this.getPage();
  },
  watch: {
    $route() {
      this.getPage();
    },
  },
  computed: {
    formatNumber() {
      let phone = this.item.Phone;
      if (!phone) return "";
      return phone.replace(/886-/, "0");
    },
  },
  methods: {
    async getPage() {
      const response = await this.getItem();
      this.item = response.data[0];
      this.getNearbyItems();
      this.showPinFill = this.isCollected(this.item);
    },
    getItem() {
      const ID = this.$route.params.id;
      const type = this.$route.params.id.substr(0, 2);

      return this.axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Tourism/${this.getCategory(
          type
        )}`,
        {
          params: {
            $filter: `ID eq '${ID}'`,
            $format: "JSON",
          },
          headers: this.GetAuthorizationHeader(),
        }
      );
    },
    getNearbyItems() {
      Promise.all(
        this.types.map((type) => {
          return this.axios.get(
            `https://ptx.transportdata.tw/MOTC/v2/Tourism/${type.en}`,
            {
              params: {
                $select: `ID, NAME, Address, Picture`,
                $top: 5,
                $spatialFilter: `nearby(${this.item.Position.PositionLat}, ${this.item.Position.PositionLon}, 20000)`,
                $format: "JSON",
              },
              headers: this.GetAuthorizationHeader(),
            }
          );
        })
      ).then((allResponse) => {
        this.nearbyLists = allResponse.map((response) => {
          return response.data
            .filter((item) => item.ID !== this.item.ID)
            .slice(0, 4);
        });
      });
    },
  },
};
</script>
