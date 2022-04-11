import {
  createStore
} from 'vuex'
import createPersistedState from "vuex-persistedstate"
import auth from './auth.js'
import theme from './theme.js'
import browser from './browser.js'
import album from './album.js'
import comment from './comment.js'
import image from './image.js'
import video from './video.js'
import nav from './nav.js'

export default createStore({
  getters: {
    token: state => state.auth.token,
    isAuthenticated: state => !!state.auth.token,
    host: () => process.env.VUE_APP_BASE_URL,
    darkTheme: state => state.theme.dark,
  },

  plugins: [
    createPersistedState({
      paths: ['auth', 'theme', 'browser']
    })
  ],

  modules: {
    auth,
    theme,
    browser,
    album,
    comment,
    image,
    video,
    nav,
  }
})