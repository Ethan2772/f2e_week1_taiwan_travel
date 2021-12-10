<template>
  <div>
    <Header class="mb-5">
      <template #city>
        <div class="chinese text-white">{{ selectCity.ch.substr(0, 2) }}</div>
        <div class="english text-white">{{ selectCity.en }}</div>
      </template>
      <template #selector>
        <div class="input__group d-flex">
          <div class="input__select">
            <select name="cities" id="cities" class="custom-selector shadow">
              <option
                v-for="city in cities"
                :key="city.ch"
                :value="{ ch: city.ch, en: city.en }"
              >
                {{ city.ch }}
              </option>
            </select>
          </div>
          <div class="input__select">
            <select name="types" id="types" class="custom-selector shadow">
              <option v-for="type in types" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
          </div>
          <div class="button-search d-flex align-items-center" @click="getData">
            <i class="bi bi-search text-white mx-auto"></i>
          </div>
        </div>
      </template>
    </Header>
    <div class="container">
      <div class="row mx-lg-5">
        <router-link
          v-for="item in data"
          :key="item.ID"
          :to="{ name: 'Tourism', params: { id: item.ID } }"
          class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4"
        >
          <Card :item="item" />
        </router-link>
      </div>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item position-relative" style="margin-right: 77px">
            <a class="page-link" href="#" aria-label="Previous">
              <span class="arrow arrow-left" aria-hidden="true"></span>
            </a>
          </li>
          <li class="page-item page-item-active">
            <a class="page-link" href="#">1</a>
          </li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">4</a></li>
          <li class="page-item"><a class="page-link" href="#">5</a></li>
          <li class="page-item" style="margin-left: 77px">
            <a class="page-link" href="#" aria-label="Next">
              <span class="arrow arrow-right" aria-hidden="true"></span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.input__select {
  margin-right: 20px;
  .custom-selector {
    height: 49px;
    border-radius: 40px;
    border: 0;
    background-color: $Off_White;
    font-size: $Text_Large;
    font-weight: bold;
    color: $Title_Active;
    line-height: 125%;
    padding: 12px 52px 12px 24px;
    cursor: pointer;
    // appearance: none; /* Remove default arrow */
    -webkit-appearance: none;
    -moz-appearance: none;
    background: url("../assets/arrow_down.png") no-repeat 80% center transparent;
    background-size: 12px 6px;
    background-color: #fff;
    &:after {
      content: "";
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
      width: 6px;
      height: 6px;
      border-right: 2px solid black;
      border-bottom: 2px solid black;
    }
    &:-ms-expand { 
      display: none; 
    }
    &:focus-visible {
      outline: none;
    }
  }
}
.button-search {
  cursor: pointer;
  width: 73px;
  height: 49px;
  border-radius: 40px;
  background-color: $Primary;
  font-size: $Text_Large;
}
.pagination {
  margin-top: 40px;
  margin-bottom: 80px;
}
.page-item {
  width: 28px;
  height: 28px;
  &-active {
    border-radius: 50%;
    background-color: rgba(0, 187, 240, 0.5);
    .page-link {
      color: $Off_White !important;
    }
  }
  .page-link {
    color: $Title_Active;
    font-size: $Text_Small;
    line-height: 28px;
    margin-left: 0;
    padding: 0;
    border: 0;
    background-color: transparent;
    &::focus {
      box-shadow: 0;
    }
  }
}
.arrow {
  position: absolute;
  top: 8px;
  display: block;
  width: 0 !important;
  height: 0 !important;
  border-style: solid;
  &-left {
    border-width: 6px 6px 6px 0;
    border-color: transparent $Title_Active transparent transparent;
    right: 0;
  }
  &-right {
    border-width: 6px 0 6px 6px;
    border-color: transparent transparent transparent $Title_Active;
    left: 0;
  }
}
</style>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Card from "@/components/Card.vue";
import jsSHA from "jssha";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
    Card,
  },
  data() {
    return {
      selectCity: {
        ch: "台南",
        en: "TAINAN",
      },
      cities: [
        { ch: "基隆市", en: "Keelung" },
        { ch: "台北市", en: "Taipei" },
        { ch: "新北市", en: "New Taipei" },
        { ch: "桃園縣", en: "Taoyuan" },
        { ch: "新竹市", en: "Hsinchu" },
        { ch: "新竹縣", en: "Hsinchu" },
        { ch: "苗栗縣", en: "Miaoli" },
        { ch: "台中市", en: "Taichung" },
        { ch: "彰化縣", en: "Changhua" },
        { ch: "南投縣", en: "Nantou" },
        { ch: "雲林縣", en: "Yunlin" },
        { ch: "嘉義市", en: "Chiayi" },
        { ch: "嘉義縣", en: "Chiayi" },
        { ch: "台南市", en: "Tainan" },
        { ch: "高雄市", en: "Kaohsiung" },
        { ch: "屏東縣", en: "Pingtung" },
        { ch: "台東縣", en: "Taitung" },
        { ch: "花蓮縣", en: "Hualien" },
        { ch: "宜蘭縣", en: "Yilan" },
        { ch: "澎湖縣", en: "Penghu" },
        { ch: "金門縣", en: "Kinmen" },
        { ch: "連江縣", en: "Lienchiang" },
      ],
      types: ["景點", "美食", "旅宿", "活動"],
        {
        },
        {
        },
        {
        },
        {
        },
        {
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
  mounted() {
    this.getData();
  },
  methods: {
    GetAuthorizationHeader() {
      const AppID = "4ad9f73726a0409a9376afd2b59e59a7";
      const AppKey = "iR-j7mJI1CY924a-xfd6vhXZciM";

      const GMTString = new Date().toGMTString();
      const ShaObj = new jsSHA("SHA-1", "TEXT");
      ShaObj.setHMACKey(AppKey, "TEXT");
      ShaObj.update("x-date: " + GMTString);
      const HMAC = ShaObj.getHMAC("B64");
      const Authorization =
        'hmac username="' +
        AppID +
        '", algorithm="hmac-sha1", headers="x-date", signature="' +
        HMAC +
        '"';

      return {
        Authorization: Authorization,
        "X-Date": GMTString /*,'Accept-Encoding': 'gzip'*/,
      }; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
    },
    getData() {
      const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${this.selectType.en}/${this.selectCity.value}`;
      fetch(
        `${url}?$select=ID, NAME, Address, Picture&$top=20&$format=JSON`,
        { headers: this.GetAuthorizationHeader() }
      )
        .then((response) => response.json())
        .then((data) => {
          this.data = data;
        });

      [].forEach.call(
        document.querySelectorAll(".chinese"),
        (element, index) =>
          (element.innerHTML = this.selectCity.ch.substr(index, 1))
      );
      document.querySelector(".english").innerHTML = this.selectCity.en;
    },
  },
};
</script>
