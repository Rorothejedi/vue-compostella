export default {
    namespaced: true,

    state: {
        first_view: true,
        top_home: 0,
    },

    mutations: {
        FIRST_VIEW_SEEN(state) {
            state.first_view = false
        },
        SET_TOP_HOME(state, payload) {
            state.top_home = payload
        },
    },

    actions: {
        changeTopHome(store, value) {
            store.commit('SET_TOP_HOME', value)
        }
    },
}