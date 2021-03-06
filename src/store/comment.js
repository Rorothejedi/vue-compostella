import axios from 'axios'

export default {
    namespaced: true,

    state: {
        reportedComments: {}
    },

    mutations: {
        SET_REPORTED_COMMENTS(state, payload) {
            state.reportedComments = payload
        }
    },

    actions: {
        /* Comment */

        createComment(store, payload) {
            return axios.post(`${process.env.VUE_APP_BASE_URL}/api/comment`, payload)
                .catch(error => {
                    throw new Error('Comment creation failed', error)
                })
        },
        updateComment(store, [id, payload]) {
            return axios.patch(`${process.env.VUE_APP_BASE_URL}/api/comment/${id}`, payload)
                .catch(error => {
                    console.log('Comment edition failed: ', error)
                })
        },
        reportComment(store, [id, payload]) {
            return axios.post(`${process.env.VUE_APP_BASE_URL}/api/comment/${id}/report`, payload)
                .catch(error => {
                    throw new Error('Comment report failed', error)
                })
        },
        loveComment(store, [id, payload]) {
            return axios.post(`${process.env.VUE_APP_BASE_URL}/api/comment/${id}/love`, payload)
                .catch((error) => {
                    throw new Error('Comment love failed', error)
                })
        },
        unloveComment(store, [id, payload]) {
            return axios.post(`${process.env.VUE_APP_BASE_URL}/api/comment/${id}/unlove`, payload)
                .catch(error => {
                    throw new Error('Comment unlove failed', error)
                })
        },
        deleteComment(store, id) {
            return axios.delete(`${process.env.VUE_APP_BASE_URL}/api/comment/${id}`)
        },

        /* Reported comments */

        loadReportedComments(store) {
            return axios.get(`${process.env.VUE_APP_BASE_URL}/api/comments/reports`)
                .then(response => {
                    store.commit('SET_REPORTED_COMMENTS', response.data)
                })
        },
        resetReportedComment(store, id) {
            return store.dispatch('updateComment', [id, {
                report: 0
            }])
        },
    },
}