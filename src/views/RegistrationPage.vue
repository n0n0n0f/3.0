<template>
  <div class="form-container">
    <div class="form-header">
      <router-link class="prevPage" to="/">Go Back</router-link>
    </div>
    <form @submit.prevent="store.commit('userRegistration')" class="registration-form">
      <label for="fullName" class="label">Full Name:</label>
      <input id="fullName" type="text" required v-model="store.state.fullName" :class="{ 'input-field': true, 'error': !isFullNameValid }">
      <p v-if="!isFullNameValid" class="error-message">Enter a valid Full Name</p>
      <label for="email" class="label">Email:</label>
      <input id="email" type="email" required v-model="store.state.email" :class="{ 'input-field': true, 'error': !isEmailValid }">
      <p v-if="!isEmailValid" class="error-message">Enter a valid email address</p>
      <label for="password" class="label">Password:</label>
      <input id="password" type="password" required v-model="store.state.password" :class="{ 'input-field': true, 'error': !isPasswordValid }">
      <p v-if="!isPasswordValid" class="error-message">Password must be at least 6 characters</p>
      <input type="submit" value="Sign Up" class="submit-button">
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
    isFullNameValid() {
      return this.store.state.fullName.trim() !== '';
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
  font-size: 22px; /* Increased font size for labels */
  margin-bottom: 5px; /* Increased spacing between labels and fields */
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
  font-size: 22px; /* Increased font size for buttons */
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
