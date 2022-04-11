export default {
    namespaced: true,

    state: {
        dark: false,
        admin_dark: false,
    },

    mutations: {
        SWITCH_DARK_THEME(state) {
            state.dark = !state.dark
        },
        SET_ADMIN_DARK(state, payload) {
            state.admin_dark = payload
        },
    },

    actions: {
        switchDarkTheme(store) {
            store.commit('SWITCH_DARK_THEME')
        },
        changeAdminDarkTheme(store) {
            store.commit('SET_ADMIN_DARK', true)
        }
    },
}