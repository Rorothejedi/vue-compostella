export default {
    namespaced: true,

    state: {
        first_view: true,
        top_home: 0,
    },

    mutations: {
        SET_FIRST_VIEW(state, payload) {
            state.first_view = payload
        },
        SET_TOP_HOME(state, payload) {
            state.top_home = payload
        },
    },

    actions: {
        firstViewSeen(store) {
            store.commit('SET_FIRST_VIEW', false)
        },
        changeTopHome(store, value) {
            store.commit('SET_TOP_HOME', value)
        }
    },
}