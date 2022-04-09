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
        LOGOUT_SUCCESS(state) {
            state.token = null
        },
        LOG_ERROR(state) {
            state.token = null
        },
    },

    actions: {
        login(store, payload) {
            return axios.post(`${process.env.VUE_APP_BASE_URL}/api/login`, payload)
                .then(response => {
                    store.commit('LOGIN_SUCCESS', response.data.token)
                })
                .catch(error => {
                    store.commit('LOG_ERROR')
                    throw new Error('Login failed: ', error)
                })
        },
        logout(store) {
            return axios.post(`${process.env.VUE_APP_BASE_URL}/api/logout`)
                .then(() => {
                    store.commit('LOGOUT_SUCCESS')
                })
                .catch(error => {
                    store.commit('LOG_ERROR')
                    console.log('Logout failed: ', error)
                })
        }
    },
}