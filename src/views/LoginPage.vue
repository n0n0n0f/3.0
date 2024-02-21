<template>
  <div class="form-header">
    <router-link class="prevPage" to="/">Назад</router-link>
  </div>
  <form @submit.prevent="store.commit('login')" class="login-form">
    <label class="label">Эл. почта:</label>
    <input type="email" required v-model="store.state.email" :class="{ 'input-field': true, 'error': !isEmailValid }">
    <label class="label">Пароль:</label>
    <input type="password" required v-model="store.state.password" :class="{ 'input-field': true, 'error': !isPasswordValid }">
    <input type="submit" value="Войти" class="submit-button">
  </form>
</template>

<script>
import store from "@/store";

export default {
  computed: {
    store() {
      return store
    },
    isEmailValid() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(this.store.state.email);
    },
    isPasswordValid() {
      return this.store.state.password.length >= 6;
    }
  },
}
</script>
<style scoped>

</style>