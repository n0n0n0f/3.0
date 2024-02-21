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
.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #f7f7f7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-header {
  margin-bottom: 20px;
}

.registration-form {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 22px; /* Увеличенный размер текста для меток */
  margin-bottom: 5px; /* Немного увеличиваем расстояние между метками и полями */
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

.input-field:hover {
  background-color: #d8bfd8;
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
  font-size: 22px; /* Увеличенный размер текста для кнопки */
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #7e349d;
}

.prevPage {
  font-size: 22px; /* Увеличенный размер текста для кнопки */
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
  margin-left: 30%;
}

.prevPage:hover {
  background-color: #7e349d;
}
</style>
