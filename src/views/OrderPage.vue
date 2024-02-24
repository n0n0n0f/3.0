<template>
  <div class="orders-container">
    <h2>Ваши заказы</h2>
    <div class="order-header">
      <router-link class="prev-link" to="/">Назад</router-link>
    </div>
    <div v-show="store.state.orderList.length === 0">
      <h2 class="no-orders-msg">В данный момент нет заказов</h2>
    </div>
    <div class="order" v-for="order in store.state.orderList" :key="order.id">
      <ul>
        <h3 class="order_number">Заказ: {{ order.id }}</h3>
        <p>Список товаров в заказе:</p>
        <ul>
          <li v-for="item in order.products" :key="item">
            <p class="item">id товара: {{ item }}</p>
            <p class="item">Товар: {{ this.store.state.products.find(p => p.id === item).name }}</p>
          </li>
          <p>стоимость: {{ order.order_price }} руб.</p>
        </ul>
      </ul>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  computed: {
    store() {
      return store
    }
  },
  mounted() {
    this.$store.commit('getOrders');
  }
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

li {
  list-style-type: none;
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