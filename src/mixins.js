import Vue from "vue";
import jsSHA from "jssha";
import { del, set } from "idb-keyval";

Vue.mixin({
  methods: {
    GetAuthorizationHeader() {
      const AppID = "c463b0a8108344aead01e54c4bb12a51";
      const AppKey = "B-WGtS021optCZVmNlE1HVqd8Z8";

      const GMTString = new Date().toGMTString();
      const ShaObj = new jsSHA("SHA-1", "TEXT");
      ShaObj.setHMACKey(AppKey, "TEXT");
      ShaObj.update("x-date: " + GMTString);
      const HMAC = ShaObj.getHMAC("B64");
      const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;

      return {
        Authorization: Authorization,
        "X-Date": GMTString /*,'Accept-Encoding': 'gzip'*/,
      }; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
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
    toggleColect(card) {
      this.isCollected(card) ? del(card.ID) : set(card.ID, card);
      this.$store.commit("toggleCard", card);
    },
    isCollected(card) {
      let boolean = this.$store.getters.getCollection.find(
        (collectCard) => collectCard.ID === card.ID
      );
      return boolean ? true : false;
    },
  },
});
