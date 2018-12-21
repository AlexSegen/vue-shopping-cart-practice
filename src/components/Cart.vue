<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-2"></div>
      <div class="col-sm-6">
        <h5>🏬 Store</h5>
        <hr />
        <ul class="list-item">
          <li v-for="(item, index) in items" :key="item.id">
            <div class="card">
              <div class="card-body">
                <span>{{ item.name }}</span> <br />
                <span>$ {{ item.price }}</span>
              </div>
              <div class="card-footer">
                <button
                  class="btn btn-sm"
                  @click="addItem(item, index);"
                  :class="item.added ? 'btn-success' : ' btn-secondary'"
                  :disabled="item.added"
                  v-text="item.added ? '✅' : '➕'"
                ></button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-sm-4">
        <div class="card my-5">
          <div class="card-header">
            <small>❤️This is your shopping cart</small>
          </div>
          <div class="card-body1">
            <ul class="list-group cart-list">
              <li
                class="list-group-item small text-center"
                v-if="cart.items.length == 0"
              >
                Your cart is empty 🤔<br />
                <strong>Buy something nice!</strong>
              </li>
              <li
                class="list-group-item"
                v-for="(item, index) in cart.items"
                :key="item.id"
              >
                {{ item.name }} $ {{ item.price }}
                <span
                  class="badge badge-danger float-right"
                  role="button"
                  @click="removeItem(item, index);"
                  >X</span
                >
              </li>
            </ul>
          </div>
          <div class="card-footer">
            Total: <span class="badge badge-success">💲 {{ sumTotal }}</span>
            <span
              @click="buy"
              class="badge badge-primary float-right"
              role="button"
            >
              🛒 Buy
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import items from "@/items";
export default {
  name: "HelloWorld",
  data() {
    return {
      items: items,
      msg: "Welcome to Your Vue.js App",
      cart: {
        items: []
      },
      order: {
        name: "",
        items: [],
        total: null
      }
    };
  },
  computed: {
    sumTotal() {
      let total = 0;
      for (let i of this.cart.items) {
        total += i.price;
      }
      return total;
    }
  },
  created() {},
  methods: {
    addItem(item) {
      let found = this.items.find(i => i.id == item.id);
      found.added = true;
      this.cart.items.push(item);
    },
    removeItem(item, index) {
      let found = this.items.find(i => i.id == item.id);
      found.added = false;
      this.cart.items.splice(index, 1);
    },
    buy() {
      if (this.cart.items.length > 0) {
        let now = new Date();
        this.order = {
          name: "Alejandro",
          items: this.cart.items,
          total: this.sumTotal,
          date: now
        };
      } else {
        alert("Your cart is empty 🙄");
      }
    }
  }
};
</script>
<style scoped>
[role="button"] {
  cursor: pointer;
}
.list-item {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}
.list-item > li {
  display: inline-block;
  margin: 0 5px 10px;
}
</style>
