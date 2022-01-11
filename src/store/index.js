import {
  createStore
} from 'vuex'
import album from './album.js'

export default createStore({
  modules: {
    album,
  }
})