import {
    createApp
} from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import VuePictureSwipe from 'vue-picture-swipe';

const token = store.getters.token

if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

createApp(App)
    .use(store)
    .use(router)
    .component('vue-picture-swipe', VuePictureSwipe)
    .mount('#app')