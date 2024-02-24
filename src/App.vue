<template>
  <router-view :cart="cart" @update:cart="cart = $event" />
  <router-view v-slot="{ CartView }">
    <component :is="CartView" v-if="CartView" />
  </router-view>
</template>

<script>
import store from "@/store";
export default {
  computed: {
    store() {
      return store
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>