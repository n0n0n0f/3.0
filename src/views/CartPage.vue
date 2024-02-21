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
</style>
