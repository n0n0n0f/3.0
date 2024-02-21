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
.form-header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.login-form {
  flex-direction: column;
  justify-content: center;
  width: 400px;
  margin: 0 auto;
  display: flex;
}

.label {
  font-size: 22px;
  margin-bottom: 5px;
  color: #8a2be2;
}

.input-field {
  font-size: 20px;
  height: 45px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
  background-color: #e6e6fa;
}

.input-field:focus {
  border-color: #8a2be2;
}

.error {
  border-color: red;
}

.error-message {
  color: red;
  margin-top: -10px;
}

.submit-button {
  cursor: pointer;
  color: #fff;
  border: none;
  border-radius: 5px;
  background-color: #8a2be2;
  padding: 12px 20px;
  font-size: 22px;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #7e349d;
}

.prevPage {
  font-size: 22px;
  color: #fff;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  background-color:#8a2be2;
  display: flex;
  width: 160px;
  height: 50px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.prevPage:hover {
  background-color: #7e349d;
}
</style>