<template>
  <div class="orders-container">
    <h2>Your Orders:</h2>
    <div class="order-header">
      <router-link class="prev-link" to="/">Go Back</router-link>
    </div>
    <div v-show="store.state.orderList.length === 0">
      <h2 class="no-orders-msg">You have no orders at the moment.</h2>
    </div>
    <div class="order" v-for="order in store.state.orderList" :key="order.id">
      <ul>
        <li class="product" v-for="productId in order.products" :key="productId">
          <p><strong>{{ store.state.orderList(productId) }}</strong></p>
          <p><strong>Description:</strong> {{ getProductDescription(productId) }}</p>
          <p><strong>Quantity:</strong> {{ getProductQuantity(productId) }}</p>
          <p><strong>Price:</strong> {{ getProductPrice(productId) }}</p>
        </li>
      </ul>
      <hr>
      <p><strong>Total: {{ fullPrice(order) }}</strong></p>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import axios from "axios";

export default {
  computed: {
    store() {
      return store;
    }
  },
  methods: {
    async getProductTitle(productId) {
      const product = await this.getProduct(productId);
      return product.title || 'Product Title Unavailable';
    },
    async getProductDescription(productId) {
      const product = await this.getProduct(productId);
      return product.description || 'Product Description Unavailable';
    },
    async getProductQuantity(productId) {
      const product = await this.getProduct(productId);
      return product.quantity || 0;
    },
    async getProductPrice(productId) {
      const product = await this.getProduct(productId);
      return product.price || 0;
    },
    async getProduct(productId) {
      const token = this.store.state.user_token;
      try {
        const response = await axios.get(`https://jurapro.bhuser.ru/api-shop/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return response.data.data;
      } catch (error) {
        console.log(error);
        return {}; // Return empty object in case of error
      }
    },
    fullPrice(order) {
      if (!order || !order.products) {
        return 0;
      }
      return order.products.reduce((total, product) => total + product.price * product.quantity, 0);
    },
  },
}
</script>

<style scoped>
.orders-container {
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

.prev-link {
  font-size: 18px;
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #8a2be2;
  transition: background-color 0.3s ease;
}

.prev-link:hover {
  background-color: #9400d3;
}

.prev-link:active {
  background-color: #6a5acd;
}

.no-orders-msg {
  margin-top: 100px;
  font-style: italic;
}
</style>
