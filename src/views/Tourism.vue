<template>
  <div>
    <Header :Picture="item.Picture" class="mb-5">
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
          <div class="article__title d-flex align-items-center">
            <div class="btn-previous-page p-0" @click="$router.go(-1)">
              <i
                class="bi bi-chevron-left"
                style="font-size: 20px; font-weight: 700"
              ></i>
            </div>
            <h1 class="ms-3">{{ item.Name }}</h1>
          </div>
          <div class="row mt-5">
            <div class="col-lg-7">
              <div class="article__text">
                <p>{{ checkValue(item.Description) }}</p>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="article__info">
                <div
                  class="shadow-sm p-4 mb-3 bg-white d-flex"
                  style="border-radius: 20px"
                >
                  <i class="bi bi-geo-alt-fill d-block me-3"></i>
                  {{ checkValue(item.Address) }}
                </div>
                <div
                  class="shadow-sm p-4 mb-3 bg-white d-flex"
                  style="border-radius: 20px"
                >
                  <i class="bi bi-telephone-fill d-block me-3"></i>
                  <a v-if="item.Phone" :href="`tel:${item.Phone}`">{{
                    formatNumber
                  }}</a>
                  <a v-else>未提供資訊</a>
                </div>
                <div
                  class="shadow-sm p-4 mb-3 bg-white d-flex"
                  style="border-radius: 20px"
                >
                  <i class="bi bi-clock-fill d-block me-3"></i>
                  <span>{{ checkValue(item.OpenTime) }}</span>
                </div>
                <a :href="item.WebsiteUrl" target="_blank"
                  ><div
                    class="shadow-sm p-4 mb-3 bg-white d-flex"
                    :class="{ 'd-none': !item.WebsiteUrl }"
                    style="border-radius: 20px; word-break: break-all"
                  >
                    <i class="bi bi-share-fill d-block me-3"></i>
                    {{ item.WebsiteUrl }}
                  </div></a
                >
              </div>
            </div>
          </div>
          <l-map
            style="width: 100%; height: 400px; margin-top: 32px"
            :zoom="18"
            :center="markerLatLng"
          >
            <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            ></l-tile-layer>
            <l-marker :lat-lng="markerLatLng"></l-marker>
          </l-map>
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
  &:hover {
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
a {
  text-decoration: none;
  color: $Title_Active;
}
</style>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import NearbyList from "@/components/NearbyList.vue";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { Icon } from "leaflet";
import { get } from "idb-keyval";

export default {
  name: "Tourism",
  components: {
    Header,
    Footer,
    NearbyList,
    LMap,
    LTileLayer,
    LMarker,
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
      markerLatLng: [0, 0],
    };
  },
  created() {
    this.getPage();
    this.reloadLMarkerIcon();
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
      if (navigator.onLine) {
        const response = await this.getItem();
        this.item = response.data[0];
        this.markerLatLng = [
          this.item.Position.PositionLat,
          this.item.Position.PositionLon,
        ];

        this.getNearbyItems();
        this.showPinFill = this.isCollected(this.item);
      } else {
        get(this.$route.params.id).then((value) => {
          console.log(value);
          this.item = value;
        });
      }
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
                $select: `ID, NAME, Address, Picture, Description, Phone`,
                $top: 5,
                $spatialFilter: `nearby(${this.item.Position.PositionLat}, ${this.item.Position.PositionLon}, 40000)`,
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
    reloadLMarkerIcon() {
      delete Icon.Default.prototype._getIconUrl;
      Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
      });
    },
    checkValue(val) {
      if (val) return val;
      return "未提供資訊";
    },
  },
};
</script>
