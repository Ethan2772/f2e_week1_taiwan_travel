<template>
  <div>
    <Header class="mb-5" />
    <div class="container">
      <div class="article row justify-content-center mb-5">
        <div class="col-lg-10">
          <div class="article__title" style="height: 90px">
            <h1>{{ item.Name }}</h1>
          </div>
          <div class="row">
            <div class="col-lg-9">
              <div class="article__text">
                <p>{{ item.Description }}</p>
              </div>
            </div>
            <div class="col-lg-3">
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
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
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
</style>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Tourism",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      item: {
        ID: "C3_315081600H_000019",
        RestaurantID: "C3_315081600H_000019",
        Name: "田媽媽長盈海味屋",
        RestaurantName: "田媽媽長盈海味屋",
        Description:
          "一個沿海的偏鄉小鎮的個體養殖戶，一個無毒養殖的堅持理念一段細漢留下來的在地心故鄉情，一份感動一份真心，只為了遠道而來的客人吃的安心。即使在無毒養殖的過程中經歷多次的失敗，在研發過程中遇到更多的挫折。但創立的初衷告訴我要堅持下去，有些時候淚水更甚於汗水。也因為有了這份堅持，陸陸續續獲得中央與地方政府的重視，因為一尾產銷履歷及輸出歐盟雙認證的虱目魚一夜干經評鑑獲農委會田媽媽的認可這一切的付出都值得了。也因為大家的肯定更增加了我們的信念與堅持相信好品質的美味能與大家分享，如此這份動力來源才能讓長盈海味屋繼續堅持下去雖然我們不會做生意，但我們的用心是大家看得到的，也希望在偏遠的海邊能留下當初懷念的滋味。 長盈海味屋的榮譽榜★榮獲104年水產養殖界的最高榮譽「產銷履歷達人」。(南市唯二入圍)★榮獲104年水產精品「海宴獎」的肯定。(南市唯一入圍)★2014 全國農委會田媽媽十大招...",
        Address: "臺南市727北門區慈安里三寮灣484號",
        ZipCode: "727",
        Phone: "886-9-17549736",
        OpenTime: "上午08:00到晚上19:00",
        Picture: {
          PictureUrl1: "https://swcoast-nsa.travel/image/325/640x480",
          PictureDescription1: "田媽媽長盈海味屋外觀",
        },
        Position: {
          PositionLon: 120.11064147949219,
          PositionLat: 23.23879051208496,
          GeoHash: "wsjkjnmzu",
        },
        Class: "其他",
        City: "臺南市",
        SrcUpdateTime: "2021-11-17T01:15:48+08:00",
        UpdateTime: "2021-11-17T02:03:50+08:00",
      },
    };
  },
};
</script>
