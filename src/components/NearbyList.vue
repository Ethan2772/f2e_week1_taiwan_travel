<template>
  <div v-if="list && list.length" class="nearby__list">
    <div
      class="
        nearby__list__header
        d-flex
        align-items-center
        justify-content-between
      "
    >
      <h3>附近{{ name }}</h3>
      <div class="btn btn-explore-more" @click="setSearchConfig">
        更多{{ name }}<i class="bi bi-caret-right-fill"></i>
      </div>
    </div>
    <div class="nearby__list__body row justify-content-center">
      <router-link
        v-for="item in list"
        :key="Object.values(item)[0]"
        :to="{ name: 'Tourism', params: { id: Object.values(item)[0] } }"
        replace
        class="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-2"
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
      color: $Title_Active;
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
  data() {
    return {
      cities: [
        { ch: "台北市", en: "Taipei", value: "Taipei" },
        { ch: "新北市", en: "New Taipei", value: "NewTaipei" },
        { ch: "基隆市", en: "Keelung", value: "Keelung" },
        { ch: "宜蘭縣", en: "Yilan", value: "YilanCounty" },
        { ch: "桃園縣", en: "Taoyuan", value: "Taoyuan" },
        { ch: "新竹縣", en: "Hsinchu", value: "HsinchuCounty" },
        { ch: "新竹市", en: "Hsinchu", value: "Hsinchu" },
        { ch: "苗栗縣", en: "Miaoli", value: "MiaoliCounty" },
        { ch: "台中市", en: "Taichung", value: "Taichung" },
        { ch: "彰化縣", en: "Changhua", value: "ChanghuaCounty" },
        { ch: "南投縣", en: "Nantou", value: "NantouCounty" },
        { ch: "雲林縣", en: "Yunlin", value: "YunlinCounty" },
        { ch: "嘉義縣", en: "Chiayi", value: "ChiayiCounty" },
        { ch: "嘉義市", en: "Chiayi", value: "Chiayi" },
        { ch: "台南市", en: "Tainan", value: "Tainan" },
        { ch: "高雄市", en: "Kaohsiung", value: "Kaohsiung" },
        { ch: "屏東縣", en: "Pingtung", value: "PingtungCounty" },
        { ch: "花蓮縣", en: "Hualien", value: "HualienCounty" },
        { ch: "台東縣", en: "Taitung", value: "TaitungCounty" },
        { ch: "澎湖縣", en: "Penghu", value: "PenghuCounty" },
        { ch: "金門縣", en: "Kinmen", value: "KinmenCounty" },
        { ch: "連江縣", en: "Lienchiang", value: "LienchiangCounty" },
      ],
      types: [
        { ch: "景點", en: "ScenicSpot" },
        { ch: "活動", en: "Activity" },
        { ch: "美食", en: "Restaurant" },
        { ch: "旅宿", en: "Hotel" },
      ],
    };
  },
  props: {
    name: {},
    list: {},
    city: {},
  },
  methods: {
    setSearchConfig() {
      const searchConfig = {
        city: this.cities.find((city) => city.ch === this.city),
        type: this.types.find((type) => {
          return type.ch === this.name;
        }),
      };
      sessionStorage.setItem("F2E_Travel_Search", JSON.stringify(searchConfig));

      this.$router.push({ name: "Home" });
    },
  },
};
</script>
