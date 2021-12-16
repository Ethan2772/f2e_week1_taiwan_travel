import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collection: [],
  },
  getters: {
    getCollection: (state) => {
      return state.collection;
    },
    conutCollection: (state) => {
      return state.collection.length;
    },
  },
  mutations: {
    toggleCard(state, card) {
      const index = state.collection.findIndex(
        (collectCard) => collectCard.ID === card.ID
      );
      if (index !== -1) {
        state.collection.splice(index, 1);
      } else {
        state.collection.push(card);
      }
    },
    setCollection(state, collection) {
      state.collection = collection;
    }
  },
});
