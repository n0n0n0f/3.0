import index, { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    products: [],
    realCart: [],
    orders: [],
    fio: '',
    email: '',
    password: '',
    user_token: null,
    user_auth: false
  },
  getters: {
  },
  mutations: {
    addToCart(state, product){
      let item = product;
      item = {...item, quantity: 1};
      if(state.realCart.length > 0){
        let bool = state.realCart.some(i => i.id === item.id);
        if(bool){
          let itemIndex = state.realCart.findIndex(el => el.id === item.id);
          state.realCart[itemIndex]['quantity'] += 1;
        }
        else{
          state.realCart.push(item);
        }
      }
      else{
        state.realCart.push(item);
      }
    },
    removeFromCart(state, product){
      if(state.realCart.length > 0){
        let bool = state.realCart.some(i => i.id === product.id);

        if(bool){
          let index = state.realCart.findIndex(el => el.id === product.id);
          if(state.realCart[index]['quantity'] !== 0){
            state.realCart[index]['quantity'] -= 1;
          }
        }

      }
    },
    delFromCart(state, product){
      let indexCart = state.realCart.indexOf(product);
      state.realCart.splice(indexCart, 1);
    },
    orderCreate(state){
      let newOrders = state.realCart.map(item => ({...item}));
      state.orders.push(newOrders);
      state.realCart.splice(0, state.realCart.length);
      console.log(state.orders);
    },
    async fetchProducts(state){
      const {data} = await axios.get('https://jurapro.bhuser.ru/api-shop/products')
          .then(response => state.products = response.data)
          .catch(error =>{console.log(error)})
      state.products = data;

      console.log(data);
    },
    async login(state){

      let userInfo = {
        email: state.email,
        password: state.password
      }

      const data = await axios.post('https://jurapro.bhuser.ru/api-shop/login', userInfo)
          .then(function(response) {
            state.user_token = response.data.data.user_token;
            localStorage.token = state.user_token;
          })
          .catch(error =>{console.log(error)})
      console.log(data);

      if(localStorage.token !== undefined && localStorage.token !== null){
        window.location.href = "/";
      }
    },
    async registration(state){

      let userInfo = {
        fio: state.fio,
        email: state.email,
        password: state.password
      }

      const data = await axios.post('https://jurapro.bhuser.ru/api-shop/signup', userInfo)
          .then(function (response) {
            console.log(response);
            state.user_token = response.data.data.user_token;
            localStorage.token = state.user_token;
          })
          .catch(error =>{console.log(error)})
      console.log(data)

      if(localStorage.token !== undefined && localStorage.token !== null){
        window.location.href = "/login";
      }
    },
    logout(state){
      state.user_token = null;
      localStorage.clear();
    },
    loginSuccess(state, token) {
      state.user_token = token;
      try {
        localStorage.token = token;
      } catch (error) {
        console.error("localStorage Error:", error);
      }
      // Перенаправление на главную страницу после успешной аутентификации
      window.location.href = "/";
    },

  },
  actions: {
    async login({ state, commit }) {
      try {
        let userInfo = {
          email: state.email,
          password: state.password
        }

        const response = await axios.post('https://jurapro.bhuser.ru/api-shop/login', userInfo);

        if (response.status === 200) {
          commit('loginSuccess', response.data.data.user_token);
        }
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 401) {
            commit('loginError', data.error.message);
          } else if (status === 403) {
            commit('accessForbidden', data.error.message);
          } else if (status === 404) {
            commit('resourceNotFound', data.error.message);
          } else if (status === 422) {
            commit('validationError', data.error.errors);
          }
        } else {
          console.error("Login Error:", error);
        }
      }
    }},
  modules: {
  }
})