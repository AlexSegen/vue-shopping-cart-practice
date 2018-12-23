import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    items: [
      {
        id: 1,
        name: "🥑",
        price: 25
      },
      {
        id: 2,
        name: "🍌",
        price: 15
      },
      {
        id: 3,
        name: "🍊",
        price: 5
      },
      {
        id: 4,
        name: "🍉",
        price: 7
      },
      {
        id: 5,
        name: "🍅",
        price: 10
      },
      {
        id: 6,
        name: "🍊",
        price: 8
      },
      {
        id: 7,
        name: "🍇",
        price: 2
      }
    ],
    cartItems: [],
    order: {
      name: "Alejandro",
      items: [],
      total: null,
      date: null,
      finished: false
    },
    checkoutDone: false
  },
  getters: {
    ITEMS: state => {
      return state.items;
    },
    CART_ITEMS: state => {
      return state.cartItems;
    },
    CHECKOUT_DONE: state => {
      return state.checkoutDone;
    },
    TOTAL: state => {
      let total = 0;

      if (state.cartItems.length > 0) {
        for (let i of state.cartItems) {
          total += i.price;
        }
        return total;
      }
      return total;
    },
    ORDER: state => {
      return state.order;
    }
  },
  mutations: {
    ADD_ITEM: (state, item) => {
      let found = state.items.find(i => i.id == item.id);
      found.added = true;
      state.cartItems.push(item);
      state.checkoutDone = false;
    },
    REMOVE_ITEM: (state, item) => {
      let found = state.cartItems.find(i => i.id == item.id);
      found.added = false;
      state.cartItems.splice(
        state.cartItems.findIndex(i => i.id == item.id),
        1
      );
    },
    REMOVE_ALL: state => {
      state.cartItems = [];
    },
    CHECKOUT: (state, payload) => {
      if (state.cartItems.length > 0) {
        let now = new Date();
        state.order = {
          name: payload.name,
          items: state.cartItems,
          total: payload.total,
          date: now
        };

        state.items = state.items.map(i => ({
          id: i.id,
          name: i.name,
          price: i.price,
          added: false
        }));

        state.cartItems = [];
        state.checkoutDone = true;

        console.log(state.order);
      } else {
        alert("Your cart is empty 🙄 ");
      }
    },
    CHECKOUT_STATUS: (state, payload) => {
      state.checkoutDone = payload;
    }
  },
  actions: {}
});

export default store;
