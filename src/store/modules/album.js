import axios from 'axios'

export default {
    namespaced: true,

    state: {
        albums: []
    },

    mutations: {
        SET_ALBUMS(state, items) {
            state.albums = items
        },
    },

    actions: {
        loadAlbums(store) {
            return axios.get(`${process.env.VUE_APP_BASE_URL}/api/albums`)
                .then(response => {
                    store.commit('SET_ALBUMS', response.data)
                })
        },

        clearAlbums(store) {
            store.commit('SET_ALBUMS', [])
        }
    },
}