import {
  createStore
} from 'vuex'
import createPersistedState from "vuex-persistedstate"
import album from './album.js'
import user from './user.js'
import comment from './comment.js'

export default createStore({
  getters: {
    token(state) {
      return state.user.token
    },
    isAuthenticated: state => !!state.user.token,
  },

  plugins: [
    createPersistedState({
      paths: ['user']
    })
  ],
  modules: {
    album,
    user,
    comment,
  }
})