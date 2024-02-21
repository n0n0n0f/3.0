import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'products',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/CatalogPage.vue')
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/CartPage.vue')
    }
  },
  {
    path: '/login',
    name: 'login',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/LoginPage.vue')
    }
  },
  {
    path: '/registration',
    name: 'registration',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/RegistrationPage.vue')
    }
  },
  {
    path: '/order',
    name: 'order',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/OrderPage.vue')
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router