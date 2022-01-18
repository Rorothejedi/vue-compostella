import {
    createApp
} from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import VuePictureSwipe from 'vue-picture-swipe';
import VueKinesis from "vue-kinesis";

const token = store.getters.token

if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const app = createApp(App)

app.use(store)
app.use(router)
app.use(VueKinesis)
app.component('vue-picture-swipe', VuePictureSwipe)
app.mount('#app')