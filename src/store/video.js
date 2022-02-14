import axios from 'axios'

export default {
    namespaced: true,

    state: {},

    mutations: {},

    actions: {
        createVideo(store, payload) {
            return axios.post(`${process.env.VUE_APP_BASE_URL}/api/video`, payload)
                .catch(error => {
                    console.log('Video creation failed: ', error)
                })
        },

        editVideo(store, [id, payload]) {
            return axios.patch(`${process.env.VUE_APP_BASE_URL}/api/video/${id}`, payload)
                .catch((error) => {
                    console.log('Video edition failed : ', error)
                })
        },

        deleteVideo(store, id) {
            return axios.delete(`${process.env.VUE_APP_BASE_URL}/api/video/${id}`)
                .catch((error) => {
                    console.log('Video deletion failed : ', error)
                })
        }
    },
}