import index, { createStore } from 'vuex'
import axios from "axios";

export default createStore({
    state: {
        fio: '',
        email: '',
        password: '',
        user_token: null,
        products: [],
        cartList: [],
        orderList: [],
    },
    getters: {

    },
    mutations: {
        productCartAdd(state, product) {
            const token = state.user_token;
            if (token) {
                axios.post(`https://jurapro.bhuser.ru/api-shop/cart/${product.id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => {
                        console.log({ data: { message: 'Product add to cart' } });
                        response.data.data.quantity = 1;
                        state.cartList.push(response.data.data);
                    })
                    .catch(error => {console.log(error);
                    });
            } else {
                console.log('Пользователь не авторизирован');
            }
        },
        fetchCardList(state) {
            const token = state.user_token;
            if (token) {
                axios.get(`https://jurapro.bhuser.ru/api-shop/cart`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => {
                        console.log({ data: response.data.data });
                        state.cartList = response.data.data;
                    })
                    .catch(error => {console.log(error);
                    });
            } else {
                console.log('Пользователь не авторизирован');
            }
        },
        removeCart(state, productId) {
            const token = state.user_token;
            if (token) {
                axios.delete(`https://jurapro.bhuser.ru/api-shop/cart/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => {
                        const index = state.cartList.findIndex(product => product.id === productId);
                        if (index !== -1) {
                            state.cartList.splice(index, 1);
                            console.log({ data: { message: 'Item removed from cart' } });
                        }
                    })
                    .catch(error => {
                        if (error.response && error.response.data && error.response.data.error && error.response.data.error.code === 403) {
                            console.log({ error: { code: error.response.data.error.code, message: error.response.data.error.message } });
                        } else {
                            console.log(error);
                        }
                    });
            } else {
                console.log('Пользователь не авторизирован');
            }
        },
        cartMinusPlus(state, { productId, newQuantity }) {
            const productToUpdate = state.cartList.find(product => product.id === productId);
            if (productToUpdate) {
                productToUpdate.quantity = newQuantity;
            }
        },
        async getCatalogProducts(state){
            const {data} = await axios.get('https://jurapro.bhuser.ru/api-shop/products')
                .then(response => state.products = response.data)
                .catch(error =>{console.log(error)})
            state.products = data;
        },
        async registration(state){
            const data = await axios.post('https://jurapro.bhuser.ru/api-shop/signup', {
                fio: state.fio,
                email: state.email,
                password: state.password
            })
                .then(function(response){
                    state.user_token = response.data.data.user_token;
                    localStorage.token = state.user_token;
                    console.log(response.data.data);
                    if(localStorage.token !== null && localStorage.token !== undefined){
                        window.location.href = "/login";
                    }
                })
                .catch(error =>{console.log(error)
                    alert('Попробуйте еще раз');
                })
        },
        async login(state){
            const data = await axios.post('https://jurapro.bhuser.ru/api-shop/login', {
                email: state.email,
                password: state.password
            })
                .then(function(response){
                    state.user_token = response.data.data.user_token;
                    localStorage.token = state.user_token;
                    console.log(response.data.data);
                })
                .catch(error =>{console.log(error)
                    alert('Попробуйте еще раз');
                })
            if(localStorage.token !== undefined && localStorage.token !== null){
                window.location.href = "/";
            }
        },
        async logout(state) {
            const token = state.user_token;
            const response = await axios.get(`https://jurapro.bhuser.ru/api-shop/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.status === 200 && response.data.data.message === 'logout') {
                        console.log(response.data);
                        // localStorage.removeItem('user_token');
                    }
                })
                .catch(error => {console.log(error);
                });
            state.user_token = null;
            localStorage.clear();
            state.cartList = [];
        },
        async getOrders(state){
            const {data} = await axios.get('https://jurapro.bhuser.ru/api-shop/order',{headers:{Authorization: `Bearer ${state.user_token}`}})
                .then(response => state.orderList = response.data)
                .catch(error =>{console.log(error)})
            state.orderList = data;
            console.log('Orders checker',state.orderList)
        },
        async arrangeOrder(state) {
            const token = state.user_token;
            if (token) {
                try {
                    const response = await axios.post(
                        'https://jurapro.bhuser.ru/api-shop/order',
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                    if (response.status === 201) {
                        state.orderList.unshift(response.data.data);
                        state.cartList = [];
                        console.log({ data: { order_id: response.data.data.id, message: 'Order is processed' } });
                    }
                } catch (error) {
                    if (error.response && error.response.status === 422) {
                        console.log('Cart is empty');
                    } else {
                        console.log(error);
                    }
                }
            } else {
                console.log('User is not authenticated');
            }

        },
        setOrders(state, orders) {
            state.orderList = orders;
        },
        updateCartQuantity(state, { productId, newQuantity }) {
            const productToUpdate = state.cartList.find(product => product.id === productId);
            if (productToUpdate) {
                productToUpdate.quantity = newQuantity;
            }
        },
    },
    actions: {

    },
    modules: {

    },
})