<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-2"></div>
      <div class="col-sm-6">
        <h5>🏬 Fruits Store</h5>
        <hr />
        <div class="stand">
          <div class="item-stand" v-for="(item, index) in items" :key="item.id">
            <div class="card">
              <div class="card-body">
                <span>{{ item.name }}</span> <br />
                <span class="badge badge-success small"
                  >$ {{ item.price }}</span
                >
              </div>
              <div class="card-footer">
                <button
                  class="btn btn-sm"
                  @click="addItem(item, index);"
                  :class="item.added ? 'btn-success' : ' btn-primary'"
                  :disabled="item.added"
                  v-text="item.added ? '✅' : 'BUY'"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card my-5">
          <div class="card-header">
            <small>🛒 This is your shopping cart </small>
          </div>
          <div class="card-body1">
            <div class="thanks" v-show="checkoutStatus">
              Thank you! ❤️<br />
              <button
                type="button"
                class="btn btn-sm btn-primary"
                @click="checkoutStatus = false;"
              >
                Buy again
              </button>
            </div>
            <ul v-show="!checkoutStatus" class="list-group cart-list">
              <li
                class="list-group-item small text-center"
                v-if="cart.items.length == 0"
              >
                Your cart is empty 🤔<br />
                <strong>Buy some nice food!</strong>
              </li>
              <li
                class="list-group-item"
                v-for="(item, index) in cart.items"
                :key="item.id"
              >
                {{ item.name }}
                <span class="badge badge-success small"
                  >$ {{ item.price }}</span
                >
                <span
                  class="badge badge-danger float-right"
                  role="button"
                  @click="removeItem(item, index);"
                  >X</span
                >
              </li>
            </ul>
          </div>
          <div class="card-footer text-right small" v-show="!checkoutStatus">
            <button
              @click="Checkout"
              type="button"
              class="btn btn-sm btn-primary"
            >
              💸 Checkout
              <span class="badge badge-light">💲 {{ sumTotal }}</span>
            </button>
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
      checkoutStatus: "",
      items: [],
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
  created() {
    this.listItems();
  },
  methods: {
    listItems() {
      this.items = items;
    },
    addItem(item) {
      this.checkoutStatus = false;
      let found = this.items.find(i => i.id == item.id);
      found.added = true;
      this.cart.items.push(item);
    },
    removeItem(item, index) {
      let found = this.items.find(i => i.id == item.id);
      found.added = false;
      this.cart.items.splice(index, 1);
    },
    Checkout() {
      if (this.cart.items.length > 0) {
        let now = new Date();
        this.order = {
          name: "Alejandro",
          items: this.cart.items,
          total: this.sumTotal,
          date: now
        };
        this.checkoutStatus = true;
        this.cart.items = [];
        this.listItems();
        this.items = this.items.map(i => ({
          id: i.id,
          name: i.name,
          price: i.price,
          added: false
        }));
      } else {
        alert("Your cart is empty 🙄");
      }
    }
  }
};
</script>
<style scoped>
.thanks {
  text-align: center;
  padding: 10px;
}
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
.stand {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
}

.item-stand {
  text-align: center;
}
</style>
