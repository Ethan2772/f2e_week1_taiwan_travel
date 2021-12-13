<template>
  <div>
    <Header>
      <template #middle>
        <div class="title d-flex justify-content-between align-items-center">
          <span class="title__chinese" />
          <span class="title__english" />
          <span class="title__chinese" />
        </div>
      </template>
      <template #bottomCenter>
        <div class="input__group d-flex">
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
          <Card :item="item" class="mx-auto" />
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
.title {
  color: $Off_White;
  cursor: default;
  &__chinese {
    font-size: 96px;
    font-weight: bold;
  }
  &__english {
    font-size: 32px;
    letter-spacing: 0.4em;
    margin-right: -0.4em;
  }
}
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
  font-size: 22px;
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
  created() {
    let searchHistory = JSON.parse(sessionStorage.getItem("F2E_Travel_Search"));
    if (searchHistory) {
      this.selectCity = searchHistory.city;
      this.selectType = searchHistory.type;
    }
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
        document.querySelectorAll(".title__chinese"),
        (element, index) =>
          (element.innerHTML = this.selectCity.ch.substr(index, 1))
      );
      document.querySelector(".title__english").innerHTML = this.selectCity.en;

      //Store search setting
      let searchHistory = {
        city: this.selectCity,
        type: this.selectType,
      }
      sessionStorage.setItem("F2E_Travel_Search", JSON.stringify(searchHistory));
    },
  },
};
</script>
