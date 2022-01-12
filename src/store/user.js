import axios from 'axios'

export default {
    namespaced: true,

    state: {
        token: null
    },

    mutations: {
        LOGIN_SUCCESS(state, payload) {
            state.token = payload
        },
        LOGIN_FAILED(state) {
            state.token = null
        },
        LOGOUT_SUCCESS(state) {
            state.token = null
        }
    },

    actions: {
        login(store, [email, password]) {
            return axios.post(`${process.env.VUE_APP_BASE_URL}/api/login`, {
                    email,
                    password
                })
                .then(response => {
                    store.commit('LOGIN_SUCCESS', response.data.token)
                })
                .catch(error => {
                    store.commit('LOGIN_FAILED')
                    console.log('Login failed: ', error)
                })
        },
        logout(store) {
            return axios.post(`${process.env.VUE_APP_BASE_URL}/api/logout`)
                .then(() => {
                    store.commit('LOGOUT_SUCCESS')
                })
                .catch(error => {
                    console.log('Logout failed: ', error)
                })
        }
    },
}