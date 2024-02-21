<template>
  <div class="shopping-cart">
    <div class="cart-header">
      <router-link class="back-link" to="/">Вернуться назад</router-link>
    </div>

    <div v-show="store.state.realCart.length === 0">
      <h2 class="empty-msg">Корзина пуста</h2>
    </div>
    <div class="cart-items" v-show="store.state.realCart.length > 0">
      <div class="item" v-for="(item, index) in store.state.realCart" :key="item.id">
        <div class="item-details">
          <div class="item-info">
            <p class="item-title">{{ item.name }}</p>
            <p class="item-description">{{ item.description }}</p>
            <p class="item-price">Цена: <span class="price">{{ item.price }}</span></p>
          </div>
          <div class="quantity-actions">
            <button @click="store.commit('removeFromCart', item)" :disabled="item.quantity === 1" class="quantity-button">-</button>
            <p class="quantity">Количество: <span class="quantity-value">{{ item.quantity }}</span></p>
            <button @click="store.commit('addToCart', item)" class="quantity-button">+</button>
          </div>
        </div>
        <button class="delete-button" @click="store.commit('delFromCart', item)">Удалить</button>
      </div>
    </div>
    <router-link to="/order" class="order-button" v-show="store.state.realCart.length > 0" @click="store.commit('orderCreate')">Оформить заказ</router-link>
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
    placeOrder() {
      console.log('Clicked to place order');
      this.store.commit('createOrder');
    }
  }
};
</script>

<style scoped>
.shopping-cart {
  max-width: 1200px;
  margin: 0 auto;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.back-link {
  font-size: 18px;
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #8a2be2;
  transition: background-color 0.3s ease;
}

.back-link:hover {
  background-color: #9400d3;
}

.back-link:active {
  background-color: #6a5acd;
}

.empty-msg {
  font-size: 24px;
  color: #6a0dad;
  text-align: center;
}

.cart-items {
  margin-bottom: 20px;
}

.item {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.item-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-info {
  flex: 1;
}

.item-title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.item-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  text-align: center;
}

.item-price {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.price {
  border: 1px solid #6a0dad;
  padding: 2px 5px;
  border-radius: 4px;
}

.quantity-actions {
  display: flex;
  align-items: center;
}

.quantity-button {
  font-size: 18px;
  color: #fff;
  background-color: #8a2be2;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 8px 12px;
  margin: 0 5px;
  transition: background-color 0.3s ease;
}

.quantity-button:hover {
  background-color: #9400d3;
}

.quantity {
  font-size: 18px;
  color: #6a0dad;
  margin: 0 10px;
}

.quantity-value {
  color: #6a0dad;
}

.delete-button {
  font-size: 18px;
  color: #fff;
  background-color: #e74c3c;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #865dfd;
}

.order-button {
  display: block;
  margin: 0 auto;
  font-size: 20px;
  color: #fff;
  text-decoration: none;
  background-color: #6a0dad;
  padding: 12px 24px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.order-button:hover {
  background-color: #450d5f;
}
</style>
