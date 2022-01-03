<template>
  <div>
    <div class="header position-relative" style="z-index: 1001">
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
      <div class="circle__orange circle__orange2 shadow">
        <i class="bi bi-flag"></i>
        <div class="circle__red">{{ saveItems }}</div>
      </div>
    </div>
    <l-map
      style="width: 100vw; height: 100vh; z-index: 1000"
      :zoom="18"
      :center="markerLatLng"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      ></l-tile-layer>
      <l-marker :lat-lng="markerLatLng"></l-marker>
    </l-map>
    <div class="fixed-bottom" style="margin-bottom: 60px; z-index: 1001">
      <div
        class="input__group d-flex align-items-center"
        style="padding-left: 200px; padding-bottom: 26px"
      >
        <div class="input__select">
          <select
            v-model="selectCity"
            name="cities"
            id="cities"
            class="custom-selector shadow"
          >
            <optgroup
              v-for="group in cities"
              :key="group.label"
              :label="group.label"
            >
              <option
                v-for="city in group.options"
                :key="city.ch"
                :value="city"
              >
                {{ city.ch }}
              </option>
            </optgroup>
          </select>
        </div>
        <div class="input__select">
          <select
            v-model="selectType"
            name="types"
            id="types"
            class="custom-selector shadow"
          >
            <option v-for="type in types" :key="type.en" :value="type">
              {{ type.ch }}
            </option>
          </select>
        </div>
        <div
          class="button-search d-flex align-items-center shadow"
          style="margin-right: 40vw"
          @click="search"
        >
          <i class="bi bi-search text-white mx-auto"></i>
        </div>
        <router-link :to="{ name: 'Home' }">
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
            <i class="bi bi-list-ul" style="font-size: 22px"></i>
          </div>
        </router-link>
      </div>
      <div
        class="scrollBar"
        :style="{ marginLeft: marginL + 'px' }"
        @mousewheel="scrollItems"
      >
        <div class="d-flex mx-auto" style="width: 245px">
          <router-link
            v-for="item in data"
            :key="Object.values(item)[0]"
            :to="{ name: 'Tourism', params: { id: Object.values(item)[0] } }"
            style="margin-right: 20px"
          >
            <Card :item="item" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { Icon } from "leaflet";

export default {
  name: "mapMode",
  components: {
    Card,
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      NUM_OF_PER_QUERY: 20,
      CARD_WIDTH_AND_PEDDING: 530,
      marginL: 0,
      selectCity: { ch: "台南市", en: "Tainan", value: "Tainan" },
      selectType: { ch: "美食", en: "Restaurant" },
      cities: [
        {
          label: "北部",
          options: [
            { ch: "台北市", en: "Taipei", value: "Taipei" },
            { ch: "新北市", en: "New Taipei", value: "NewTaipei" },
            { ch: "基隆市", en: "Keelung", value: "Keelung" },
            { ch: "宜蘭縣", en: "Yilan", value: "YilanCounty" },
            { ch: "桃園縣", en: "Taoyuan", value: "Taoyuan" },
            { ch: "新竹縣", en: "Hsinchu", value: "HsinchuCounty" },
            { ch: "新竹市", en: "Hsinchu", value: "Hsinchu" },
          ],
        },
        {
          label: "中部",
          options: [
            { ch: "苗栗縣", en: "Miaoli", value: "MiaoliCounty" },
            { ch: "台中市", en: "Taichung", value: "Taichung" },
            { ch: "彰化縣", en: "Changhua", value: "ChanghuaCounty" },
            { ch: "南投縣", en: "Nantou", value: "NantouCounty" },
            { ch: "雲林縣", en: "Yunlin", value: "YunlinCounty" },
          ],
        },
        {
          label: "南部",
          options: [
            { ch: "嘉義縣", en: "Chiayi", value: "ChiayiCounty" },
            { ch: "嘉義市", en: "Chiayi", value: "Chiayi" },
            { ch: "台南市", en: "Tainan", value: "Tainan" },
            { ch: "高雄市", en: "Kaohsiung", value: "Kaohsiung" },
            { ch: "屏東縣", en: "Pingtung", value: "PingtungCounty" },
          ],
        },
        {
          label: "東部",
          options: [
            { ch: "花蓮縣", en: "Hualien", value: "HualienCounty" },
            { ch: "台東縣", en: "Taitung", value: "TaitungCounty" },
          ],
        },
        {
          label: "離島",
          options: [
            { ch: "澎湖縣", en: "Penghu", value: "PenghuCounty" },
            { ch: "金門縣", en: "Kinmen", value: "KinmenCounty" },
            { ch: "連江縣", en: "Lienchiang", value: "LienchiangCounty" },
          ],
        },
      ],
      types: [
        { ch: "景點", en: "ScenicSpot" },
        { ch: "活動", en: "Activity" },
        { ch: "美食", en: "Restaurant" },
        { ch: "旅宿", en: "Hotel" },
      ],
      data: [],
    };
  },
  computed: {
    saveItems() {
      return this.$store.getters.conutCollection;
    },
    index() {
      return this.marginL / -530;
    },
    markerLatLng() {
      const item = this.data[this.index];
      if (item) {
        return [item.Position.PositionLat, item.Position.PositionLon];
      } else {
        return [0, 0];
      }
    },
  },
  created() {
    const readSearchHistory = () => {
      const searchHistory = JSON.parse(
        sessionStorage.getItem("F2E_Travel_Search")
      );
      if (searchHistory) {
        this.selectCity = searchHistory.city;
        this.selectType = searchHistory.type;
      }
    };

    readSearchHistory();
    this.reloadLMarkerIcon();
  },
  mounted() {
    this.search();
  },
  methods: {
    async search() {
      this.data = [];
      const response = await this.getData();
      this.data = this.data.concat(response.data);
      this.containerOffsetHeight = document.body.offsetHeight;
      this.setSearchHistory();
      this.marginL = 0;
    },
    getData() {
      const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${this.selectType.en}/${this.selectCity.value}`;
      return this.axios.get(url, {
        params: {
          $select: `${this.selectType.en}ID, ${this.selectType.en}Name, Address, Picture, Description, Phone, Position`,
          $skip: this.data.length,
          $top: this.NUM_OF_PER_QUERY,
          $format: "JSON",
        },
        headers: this.GetAuthorizationHeader(),
      });
    },
    setSearchHistory() {
      //Store search setting
      const searchHistory = {
        city: this.selectCity,
        type: this.selectType,
      };
      sessionStorage.setItem(
        "F2E_Travel_Search",
        JSON.stringify(searchHistory)
      );
    },
    reloadLMarkerIcon() {
      delete Icon.Default.prototype._getIconUrl;
      Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
      });
    },
    scrollItems($event) {
      if ($event.wheelDelta > 0) {
        this.marginL += this.CARD_WIDTH_AND_PEDDING;
      } else {
        this.marginL -= this.CARD_WIDTH_AND_PEDDING;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.scrollBar {
  transition: margin 0.4s ease;
}
</style>
