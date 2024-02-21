import Vue from 'vue'
import VueRouter from 'vue-router'
import Catalog from '../components/Catalog.vue'
import Registration from '../components/Registration.vue'
import Login from '../components/Login.vue'
import Cart from '../components/Cart.vue'
import Orders from '../components/Orders.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Catalog },
  { path: '/registration', component: Registration },
  { path: '/login', component: Login },
  { path: '/cart', component: Cart },
  { path: '/orders', component: Orders }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
