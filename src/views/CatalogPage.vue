<template>
  <div class="products">
    <nav>
      <p v-show="store.state.user_token === null" class="nav-links">
        <router-link to="/registration">Регистрация</router-link>
      </p>
      <p v-show="store.state.user_token === null" class="nav-links">
        <router-link to="/login">Войти в аккаунт</router-link>
      </p>
      <p v-show="store.state.user_token !== null" class="nav-links">
        <router-link to="/cart">Корзина</router-link>
      </p>
      <p v-show="store.state.user_token !== null" class="nav-links">
        <router-link to="/order">Оформленные заказы</router-link>
      </p>
      <p v-show="store.state.user_token !== null" class="nav-links">
        <a href="#" @click="store.commit('logout')">Выйти из аккаунта</a>
      </p>
    </nav>
    <div class="product-list">
      <div class="product" v-for="(product, index) in store.state.products" :key="product.id">
        <h3>{{ product.name }}</h3>
        <p><strong>Описание:</strong> {{ product.description }}</p>
        <div class="product-price-container">
          <p class="product-price">{{ product.price }}</p>
        </div>
        <button @click="store.commit('addToCart', product)" v-show="store.state.user_token !== null" class="add-to-cart">Добавить в корзину</button>
      </div>
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
  mounted() {
    if (localStorage.token !== undefined && localStorage.token !== null) {
      store.state.user_token = localStorage.token;
    }
    this.$store.commit('fetchProducts');
  },
};
</script>

<style scoped>

</style>
