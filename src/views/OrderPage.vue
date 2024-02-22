<template>
  <div class="orders">
    <h2>Your Orders:</h2>
    <div class="order-header">
      <router-link class="prevPage" to="/">Go Back</router-link>
    </div>
    <div v-show="store.state.orders.length === 0">
      <h2 class="msg">You have no orders at the moment.</h2>
    </div>
    <div class="order" v-for="order in store.state.orders" :key="order.id">
      <div class="product" v-for="product in order" :key="product.id">
        <p><strong>{{ product.title }}</strong></p>
        <p><strong>Description:</strong> {{ product.description }}</p>
        <p><strong>Quantity:</strong> {{ product.quantity }}</p>
        <p><strong>Price:</strong> {{ product.price * product.quantity }}</p>
      </div>
      <hr>
      <p><strong>Total: {{ fullPrice(order) }}</strong></p>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  computed: {
    store() {
      return store;
    }
  },
  methods: {
    fullPrice(order) {
      let totalPrice = 0;
      for (let i = 0; i < order.length; i++) {
        totalPrice += order[i].price * order[i].quantity;
      }
      return totalPrice;
    }
  }
}
</script>

<style scoped>
.orders {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #4b0082;
}

.order-header {
  margin-bottom: 20px;
}

.order {
  border: 1px solid #8a2be2;
  border-radius: 8px;
  width: 80%;
  padding: 20px 40px 20px 20px;
  margin-bottom: 40px;
  background-color: #e6e6fa;
}

.product {
  border: 1px solid #8a2be2;
  border-radius: 8px;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #d8bfd8;
}

.prevPage {
  font-size: 18px;
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #8a2be2;
  transition: background-color 0.3s ease;
}

.prevPage:hover {
  background-color: #9400d3;
}

.prevPage:active {
  background-color: #6a5acd;
}

.msg {
  margin-top: 100px;
  font-style: italic;
}
</style>
