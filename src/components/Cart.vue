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
            <div class="thanks" v-show="checkoutDone">
              <strong>Thank you!</strong>
              <h3>😊</h3>
              Enjoy your fruits!
              <hr />
              <button
                type="button"
                class="btn btn-sm btn-primary"
                @click="checkoutStatus(false);"
              >
                Buy again
              </button>
            </div>
            <ul v-show="!checkoutDone" class="list-group cart-list">
              <li
                class="list-group-item small text-center"
                v-if="cartItems.length == 0"
              >
                Your cart is empty <br />
                <h3>🤔</h3>
                <strong>Buy some nice food!</strong>
              </li>
              <li
                class="list-group-item"
                v-for="(item, index) in cartItems"
                :key="item.id"
              >
                {{ item.name }}
                <span class="badge badge-success small"
                  >$ {{ item.price }}</span
                >
                <span
                  class="badge badge-danger float-right"
                  role="button"
                  @click="removeItem(item);"
                  >X</span
                >
              </li>
            </ul>
          </div>
          <div class="card-footer text-right small" v-show="!checkoutDone">
            <button
              @click="Checkout"
              type="button"
              class="btn btn-sm btn-primary"
            >
              💸 Checkout <span class="badge badge-light">💲 {{ total }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "HelloWorld",
  data() {
    return {
      order: {
        name: "",
        total: null
      }
    };
  },
  computed: {
    ...mapGetters({
      items: "ITEMS",
      cartItems: "CART_ITEMS",
      total: "TOTAL",
      checkoutDone: "CHECKOUT_DONE"
    })
  },
  created() {},
  methods: {
    ...mapMutations([
      "ADD_ITEM",
      "REMOVE_ITEM",
      "REMOVE_ALL",
      "CHECKOUT",
      "CHECKOUT_STATUS"
    ]),
    addItem(item) {
      this.ADD_ITEM(item);
    },
    removeItem(item, index) {
      this.REMOVE_ITEM(item);
    },
    Checkout() {
      this.order = {
        name: "Alejandro",
        total: this.total
      };
      this.CHECKOUT(this.order);
    },
    checkoutStatus(param) {
      this.CHECKOUT_STATUS(param);
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
