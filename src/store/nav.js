export default {
    namespaced: true,

    state: {
        first_view: true,
        top_home: 0,
        resp_menu: false,
    },

    mutations: {
        SET_FIRST_VIEW(state, payload) {
            state.first_view = payload
        },
        SET_TOP_HOME(state, payload) {
            state.top_home = payload
        },
        SWITCH_RESP_MENU(state) {
            state.resp_menu = !state.resp_menu
        },
    },

    actions: {
        firstViewSeen(store) {
            store.commit('SET_FIRST_VIEW', false)
        },
        changeTopHome(store, value) {
            store.commit('SET_TOP_HOME', value)
        },
        switchRespMenu(store) {
            store.commit('SWITCH_RESP_MENU')
        },
    },
}