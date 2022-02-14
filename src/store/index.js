import {
  createStore
} from 'vuex'
import createPersistedState from "vuex-persistedstate"
import album from './album.js'
import user from './user.js'
import comment from './comment.js'
import image from './image.js'
import video from './video.js'

export default createStore({
  getters: {
    token: state => state.user.token,
    isAuthenticated: state => !!state.user.token,
    host: () => process.env.VUE_APP_BASE_URL,
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
    image,
    video,
  }
})