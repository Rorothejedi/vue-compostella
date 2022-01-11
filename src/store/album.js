import axios from 'axios'

export default {
    namespaced: true,

    state: {
        albums: [],
        album: [],
    },

    mutations: {
        SET_ALBUMS(state, items) {
            state.albums = items
        },
        SET_ALBUM(state, items) {
            state.album = items
        },
    },

    actions: {
        loadAlbums(store) {
            return axios.get(`${process.env.VUE_APP_BASE_URL}/api/albums`)
                .then(response => {
                    store.commit('SET_ALBUMS', response.data)
                })
        },

        loadAlbum(store, id) {
            return axios.get(`${process.env.VUE_APP_BASE_URL}/api/album/${id}`)
                .then(response => {
                    store.commit('SET_ALBUM', response.data)
                })
        },

        clearAlbum(store) {
            store.commit('SET_ALBUM', [])
        },
    },
}