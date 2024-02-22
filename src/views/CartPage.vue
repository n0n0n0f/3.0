<template>
  <div class="shopping-cart">
    <div class="cart-header">
      <router-link class="back-link" to="/">Go Back</router-link>
    </div>

    <div v-show="cartProduct.length === 0">
      <h2 class="empty-msg">Your cart is empty</h2>
    </div>
    <div class="cart-items" v-show="cartProduct.length > 0">
      <div class="item" v-for="(item, index) in cartProduct" :key="item.id">
        <div class="item-details">
          <div class="item-info">
            <p class="item-title">{{ item.title }}</p>
            <p class="item-description">{{ item.description }}</p>
            <p class="item-price">Price: <span class="price">{{ item.price }}</span></p>
          </div>
          <div class="quantity-actions">
            <button @click="cartRemove(item)" :disabled="item.quantity === 1" class="quantity-button">-</button>
            <p class="quantity">Quantity: <span class="quantity-value">{{ item.quantity }}</span></p>
            <button @click="addProductCart(item)" class="quantity-button">+</button>
          </div>
        </div>
        <button class="delete-button" @click="cartDelete(item)">Delete</button>
      </div>
    </div>
    <router-link class="order-button" to="/order" v-show="cartProduct.length > 0" @click="arrangeOrder">Place Order</router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['cartProduct'])
  },
  methods: {
    addProductCart(item) {
      this.$store.commit('addProductCart', item);
    },
    cartRemove(item) {
      this.$store.commit('cartRemove', item);
    },
    cartDelete(item) {
      this.$store.commit('deleteCart', item);
    }, arrangeOrder() {
      console.log('Clicked to place order');
      this.$store.commit('newOrder');
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
