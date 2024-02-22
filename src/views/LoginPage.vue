<template>
  <div class="form-container">
    <router-link class="prev-link" to="/">Назад</router-link>
    <form @submit.prevent="store.commit('login')" class="login-form">
      <label class="form-label">Эл. почта:</label>
      <input type="email" required v-model="store.state.email" :class="{ 'input-field': true, 'error': !isEmailValid }">
      <span v-if="!isEmailValid" class="error-message">Некорректный адрес эл. почты</span>
      <label class="form-label">Пароль:</label>
      <input type="password" required v-model="store.state.password" :class="{ 'input-field': true, 'error': !isPasswordValid }">
      <span v-if="!isPasswordValid" class="error-message">Пароль должен содержать минимум 6 символов</span>
      <input type="submit" value="Войти" class="submit-button">
    </form>
  </div>
</template>

<script>
import store from "@/store";
export default {
  computed: {
    store() {
      return store;
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
.form-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.prev-link {
  font-size: 22px;
  color: #fff;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  background-color: #8a2be2;
  display: flex;
  width: 160px;
  height: 50px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.prev-link:hover {
  background-color: #7e349d;
}

.login-form {
  flex-direction: column;
  justify-content: center;
  width: 400px;
  margin: 0 auto;
  display: flex;
}

.form-label {
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
</style>
