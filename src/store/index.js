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
    user_auth: false,
    loginError: null,
    signupError: null,
  },
  getters: {
  },
  mutations: {
    addToCart(state, product) {
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

      axios.post('https://jurapro.bhuser.ru/products', item)
          .then(response => console.log(response))
          .catch(error => console.error(error));
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
    async fetchProducts(state){
      const {data} = await axios.get('https://jurapro.bhuser.ru/api-shop/products')
          .then(response => state.products = response.data)
          .catch(error =>{console.log(error)})
      state.products = data;

      console.log(data);
    },
    delFromCart(state, product) {
      let indexCart = state.realCart.indexOf(product);
      state.realCart.splice(indexCart, 1);

      // Отправка запроса к API
      axios.delete(`http://localhost:8080/api/cart/${product.id}`)
          .then(response => console.log(response))
          .catch(error => console.error(error));
    },
    orderCreate(state) {
      let newOrders = state.realCart.map(item => ({...item}));
      state.orders.push(newOrders);
      state.realCart.splice(0, state.realCart.length);
      console.log(state.orders);
      // Отправка запроса к API
      axios.post('http://localhost:8080/api/orders', newOrders) // Замените URL на соответствующий
          .then(response => console.log(response))

          .catch(error => console.error(error));
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
      console.log("Login Success. User token:", token);
      try {
        localStorage.token = token;
      } catch (error) {
        console.error("localStorage Error:", error);
      }
      // Перенаправление на главную страницу после успешной аутентификации
      window.location.href = "/";
    },
    loginError(state, errorMessage) {
      state.loginError = errorMessage;
      console.error("Login Error:", errorMessage);
    },
    signupSuccess(state, token) {
      state.user_token = token;
      console.log("Signup Success. User token:", token);
      try {
        localStorage.token = token;
      } catch (error) {
        console.error("localStorage Error:", error);
      }
      // Перенаправление на страницу входа после успешной регистрации
      window.location.href = "/login";
    },
    signupError(state, errorMessage) {
      state.signupError = errorMessage;
      console.error("Signup Error:", errorMessage);
    },


  },
  actions: {
    async login({ state, commit }, userInfo) {
      try {
        const response = await axios.post('https://jurapro.bhuser.ru/api-shop/login', userInfo);

        if (response.status === 200) {
          commit('loginSuccess', response.data.data.user_token);
        }
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 401) {
            commit('loginError', data.error.message);
          }
        } else {
          console.error("Login Error:", error);
        }
      }
    },
    async signup({ state, commit }, userInfo) {
      try {
        const response = await axios.post('https://jurapro.bhuser.ru/api-shop/signup', userInfo);

        if (response.status === 201) {
          commit('signupSuccess', response.data.data.user_token);
        }
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 401) {
            commit('signupError', data.error.message);
          }
        } else {
          console.error("Signup Error:", error);
        }
      }
    }},
  modules: {
  }
})