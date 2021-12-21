<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Roboto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: $Background;
}
</style>
<style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>

<script>
export default {
  created() {
    let collection = localStorage.getItem("F2E_Travel_Collection");
    if (collection && collection.length)
      this.$store.commit("setCollection", JSON.parse(collection));
  },
  mounted() {
    window.onbeforeunload = () => {
      let collection = this.$store.getters.getCollection;
      localStorage.setItem("F2E_Travel_Collection", JSON.stringify(collection));
    };
  },
};
</script>
