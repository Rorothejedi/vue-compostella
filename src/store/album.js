import axios from 'axios'

export default {
    namespaced: true,

    state: {
        albums: {},
        album: {},
    },

    mutations: {
        SET_ALBUMS(state, payload) {
            state.albums = payload
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
                })
        },

        clearAlbums(store) {
            store.commit('SET_ALBUMS', [])
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