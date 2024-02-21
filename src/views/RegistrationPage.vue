<template>
  <div class="form-container">
    <div class="form-header">
      <router-link class="prevPage" to="/">Назад</router-link>
    </div>
    <form @submit.prevent="store.commit('registration')" class="registration-form">
      <label for="fio" class="label">ФИО:</label>
      <input id="fio" type="text" required v-model="store.state.fio" :class="{ 'input-field': true, 'error': !isFioValid }">
      <p v-if="!isFioValid" class="error-message">Введите корректное ФИО</p>
      <label for="email" class="label">Эл. почта:</label>
      <input id="email" type="email" required v-model="store.state.email" :class="{ 'input-field': true, 'error': !isEmailValid }">
      <p v-if="!isEmailValid" class="error-message">Введите корректный адрес электронной почты</p>
      <label for="password" class="label">Пароль:</label>
      <input id="password" type="password" required v-model="store.state.password" :class="{ 'input-field': true, 'error': !isPasswordValid }">
      <p v-if="!isPasswordValid" class="error-message">Пароль должен содержать не менее 6 символов</p>
      <input type="submit" value="Регистрация" class="submit-button">
    </form>
  </div>
</template>

<script>
import store from "@/store";

export default {
  computed: {
    store() {
      return store
    },
    isFioValid() {
      return this.store.state.fio.trim() !== '';
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
