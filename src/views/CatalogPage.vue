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
.products {
  max-width: 1200px;
  margin: 0 auto;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.nav-links {
  background-color: #7e349d;
  height: 40px;
  border-radius: 10px;
  margin: 0;
  display: flex;
  align-items: center;
  padding: 0 10px;
  transition: background-color 0.3s ease; /* Добавляем анимацию */
}

.nav-links * {
  text-decoration: none;
  color: #fff;
}

.nav-links:hover {
  background-color: #8a2be2;
}

.product-list {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.product {
  border: 1px solid #8a2be2;
  border-radius: 8px;
  width: 30%;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #e6e6fa;
}

.product h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.product-description {
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
}

.product-price-container {
  border: 1px solid #8a2be2;
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 10px;
  transition: border-color 0.3s ease;
}

.product-price {
  font-size: 18px;
  color: #333;
  margin: 0;
}

.product-price-container:hover {
  border-color: #9b59b6;
}

.add-to-cart {
  width: 100%;
  height: 40px;
  background-color: #8a2be2;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-to-cart:hover {
  background-color: #7e349d;
}
</style>
