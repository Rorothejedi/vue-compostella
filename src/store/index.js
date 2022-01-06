import {
  createStore
} from 'vuex'
import album from './modules/album.js'

export default createStore({
  modules: {
    album,
  }
})