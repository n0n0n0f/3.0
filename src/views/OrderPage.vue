<template>
  <div class="orders-container">
    <h2>Your Orders:</h2>
    <div class="order-header">
      <router-link class="prev-link" to="/">Go Back</router-link>
    </div>
    <div v-show="orderList.length === 0">
      <h2 class="no-orders-msg">You have no orders at the moment.</h2>
    </div>
    <div class="order" v-for="order in orderList" :key="order.id">
      <ul>
        <li v-for="product in order.products" :key="product.id">
         <h1> {{ getProductName(product.id) }} </h1><!-- Используйте product.id для получения имени продукта -->
          {{ product.quantity }} <!-- Отображаем количество продукта -->
        </li>
      </ul>
      <hr>
      <p><strong>Total: {{ fullPrice(order) }}</strong></p>
    </div>
  </div>
</template><script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  computed: {
    ...mapState(["orderList", "user_token"]),
  },
  created() {
    this.$store.dispatch("orderIn");
  },
  methods: {
    async getProductName(productId) {
      try {
        const response = await axios.get(
            `https://jurapro.bhuser.ru/api-shop/products/${productId}`,
            {
              headers: {
                Authorization: `Bearer ${this.user_token}`,
              },
            }
        );
        return response.data.data.name;
      } catch (error) {
        console.log(error);
        return "Product Name Unavailable"; // Provide a default name or handle the error gracefully
      }
    },
    fullPrice(order) {
      if (!order || !order.products) {
        return 0;
      }
      return order.products.reduce(
          (total, product) => total + product.price * product.quantity,
          0
      );
    },
  },
};
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
