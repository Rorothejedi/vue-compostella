import axios from 'axios'

export default {
    namespaced: true,

    state: {
        albums: {},
        albums_meta: {},
        albums_infinite: [],

        album: {},
    },

    mutations: {
        SET_ALBUMS(state, payload) {
            state.albums = payload
        },
        SET_ALBUMS_META(state, payload) {
            state.albums_meta = payload
        },
        SET_ALBUMS_INFINITE(state, payload) {
            state.albums_infinite = [
                ...state.albums_infinite,
                ...payload
            ]
        },

        SET_ALBUM(state, payload) {
            state.album = payload
        },
    },

    actions: {

        /* ALBUMS */

        loadAlbums(store, params = {}) {
            return axios.get(`${process.env.VUE_APP_BASE_URL}/api/albums`, {
                    params: params
                })
                .then(response => {
                    store.commit('SET_ALBUMS', response.data.data)
                    store.commit('SET_ALBUMS_META', response.data.meta)
                })
        },

        loadAlbumsInfinite(store, params = {}) {
            return axios.get(`${process.env.VUE_APP_BASE_URL}/api/albums`, {
                    params: params
                })
                .then(response => {
                    store.commit('SET_ALBUMS_INFINITE', response.data.data)
                    store.commit('SET_ALBUMS_META', response.data.meta)
                })
        },

        clearAlbums(store) {
            store.commit('SET_ALBUMS', [])
            store.commit('SET_ALBUMS_META', [])
        },

        /* ALBUM */

        loadAlbum(store, id) {
            return axios.get(`${process.env.VUE_APP_BASE_URL}/api/album/${id}`)
                .then(response => {
                    store.commit('SET_ALBUM', response.data)
                })
        },

        clearAlbum(store) {
            store.commit('SET_ALBUM', [])
        },

        createAlbum(store, payload) {
            return axios.post(`${process.env.VUE_APP_BASE_URL}/api/album`, payload)
                .catch(error => {
                    console.log('Album creation failed: ', error)
                })
        },

        editAlbum(store, [id, payload]) {
            return axios.patch(`${process.env.VUE_APP_BASE_URL}/api/album/${id}`, payload)
                .then(response => {
                    store.commit('SET_ALBUM', response.data)
                })
                .catch(error => {
                    console.log('Album edition failed: ', error)
                })
        },

        deleteAlbum(store, id) {
            return axios.delete(`${process.env.VUE_APP_BASE_URL}/api/album/${id}`)
                .catch(error => {
                    console.log('Album deletion failed: ', error)
                })
        }
    },
}