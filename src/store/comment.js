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
        loadReportedComments(store) {
            return axios.get(`${process.env.VUE_APP_BASE_URL}/api/comments/reports`)
                .then(response => {
                    store.commit('SET_REPORTED_COMMENTS', response.data)
                })
        }
    },
}