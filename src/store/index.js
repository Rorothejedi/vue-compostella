import {
  createStore
} from 'vuex'
import createPersistedState from "vuex-persistedstate"
import album from './album.js'
import auth from './auth.js'
import comment from './comment.js'
import image from './image.js'
import video from './video.js'
import nav from './nav.js'

export default createStore({
  getters: {
    token: state => state.auth.token,
    isAuthenticated: state => !!state.auth.token,
    host: () => process.env.VUE_APP_BASE_URL,
  },

  plugins: [
    createPersistedState({
      paths: ['auth']
    })
  ],

  modules: {
    album,
    auth,
    comment,
    image,
    video,
    nav,
  }
})