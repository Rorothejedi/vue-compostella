export default {
    namespaced: true,

    state: {
        first_view: true,
    },

    mutations: {
        FIRST_VIEW_SEEN(state) {
            state.first_view = false
        },
    },

    actions: {},
}