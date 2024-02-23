<template>
  <div class="product-container">
    <nav>
      <p v-show="store.state.user_token === null" class="nav-item">
        <router-link to="/registration">Регистрация</router-link>
      </p>
      <p v-show="store.state.user_token === null" class="nav-item">
        <router-link to="/login">Войти в аккаунт</router-link>
      </p>
      <p v-show="store.state.user_token !== null" class="nav-item">
        <router-link to="/cart">Корзина<span v-if="cartItemCount !== 0"> ({{ cartItemCount }})</span></router-link>
      </p>
      <p v-show="store.state.user_token !== null" class="nav-item">
        <router-link to="/order">Оформленные заказы</router-link>
      </p>
      <p v-show="store.state.user_token !== null" class="nav-item">
        <a href="#" @click="store.commit('logout')">Выйти из аккаунта</a>
      </p>
    </nav>
    <div class="product-list">
      <div class="product" v-for="item in this.store.state.products">
        <h3>{{ item.name }}</h3>
        <p><strong>Описание:</strong> {{ item.description }}</p>
        <div class="product-price-container">
          <p class="product-price">{{ item.price }} руб</p>
        </div>
        <button class="add-to-cart" @click="addToCart(item)">В корзину</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  computed: {
    store() {
      return store
    },
    cartItemCount() {
      return store.state.cartList.length;
    }
  },
  methods:{
    addToCart(product) {
      this.$store.commit('productCartAdd', product);
    },
  },
  mounted() {
    if (localStorage.token !== undefined && localStorage.token !== null) {
      store.state.user_token = localStorage.token;
    }
    this.$store.commit('getCatalogProducts');
  },
}
</script>


<style scoped>
.product-container {
  max-width: 1200px;
  margin: 0 auto;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.nav-item {
  background-color: #7e349d;
  height: 40px;
  border-radius: 10px;
  margin: 0;
  display: flex;
  align-items: center;
  padding: 0 10px;
  transition: background-color 0.3s ease;
}

.nav-item * {
  text-decoration: none;
  color: #fff;
}

.nav-item:hover {
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
