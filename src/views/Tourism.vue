<template>
  <div>
    <Header class="mb-5" />
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
                <div class="shadow-sm p-3 mb-3 bg-white rounded d-flex">
                  <i class="bi bi-geo-alt-fill d-block me-3"></i>
                  {{ item.Address }}
                </div>
                <div class="shadow-sm p-3 mb-3 bg-white rounded d-flex">
                  <i class="bi bi-telephone-fill d-block me-3"></i>
                  {{ item.Phone }}
                </div>
                <div class="shadow-sm p-3 mb-3 bg-white rounded d-flex">
                  <i class="bi bi-clock-fill d-block me-3"></i>
                  {{ item.OpenTime }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nearby__list">
        <div
          class="
            nearby__list__header
            d-flex
            align-items-center
            justify-content-between
          "
        >
          <h3>附近美食</h3>
          <div class="btn btn-explore-more">
            更多美食<i class="bi bi-caret-right-fill"></i>
          </div>
        </div>
        <div class="nearby__list__body row">
          <router-link
            v-for="item in nearbyItems"
            :key="item.ID"
            :to="{ name: 'Tourism', params: { id: item.ID } }"
            class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2"
          >
            <Card :item="item" />
          </router-link>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.btn-previous-page:hover {
  background-color: $Title_Active;
  color: $Off_White;
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
}
.nearby__list__header {
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
</style>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Card from "@/components/Card.vue";
import jsSHA from "jssha";

export default {
  name: "Tourism",
  components: {
    Header,
    Footer,
    Card,
  },
  data() {
    return {
      item: {},
      nearbyItems: {},
    };
  },
  created() {
    this.getItem();
  },
  watch: {
    $route() {
      this.getItem();
    },
  },
  methods: {
    GetAuthorizationHeader() {
      const AppID = "FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF";
      const AppKey = "FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF";

      const GMTString = new Date().toGMTString();
      const ShaObj = new jsSHA("SHA-1", "TEXT");
      ShaObj.setHMACKey(AppKey, "TEXT");
      ShaObj.update("x-date: " + GMTString);
      const HMAC = ShaObj.getHMAC("B64");
      const Authorization =
        "hmac username='" +
        AppID +
        "', algorithm='hmac-sha1', headers='x-date', signature='" +
        HMAC +
        "'";

      return {
        Authorization: Authorization,
        "X-Date": GMTString /*,'Accept-Encoding': 'gzip'*/,
      }; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
    },
    getItem() {
      const ID = this.$route.params.id;
      const type = this.$route.params.id.substr(0, 2);

      const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${this.getCategory(type)}`;
      //get item
      fetch(`${url}?$filter=ID eq '${ID}'&$format=JSON`)
        .then((response) => response.json())
        .then((data) => {
          this.item = data[0];
          //get nearby items
          fetch(
            `${url}?$select=ID, NAME, City, Address, Picture&$top=5&$spatialFilter=nearby(${data[0].Position.PositionLat}, ${data[0].Position.PositionLon}, 5000)&$format=JSON`
          )
            .then((response) => response.json())
            .then((data) => {
              let selfIndex = data.findIndex((e) => e.ID === this.item.ID);
              data.splice(selfIndex, 1);
              this.nearbyItems = data;
            });
        });
    },
    getCategory(type) {
      switch (type) {
        case "C1":
          return "ScenicSpot";
        case "C2":
          return "Activity";
        case "C3":
          return "Restaurant";
        case "C4":
          return "Hotel";
      }
    },
  },
};
</script>
