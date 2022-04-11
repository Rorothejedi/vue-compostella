export default {
    namespaced: true,

    state: {
        firefox: false,
    },

    mutations: {
        ALERT_TO_FIREFOX(state) {
            state.firefox = true
        },
    },

    actions: {
        alertSentToFirefox(store) {
            store.commit('ALERT_TO_FIREFOX')
        },
    },
}