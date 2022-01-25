import {
    createApp
} from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
// import VuePictureSwipe from 'vue-picture-swipe'
import VueKinesis from "vue-kinesis"
import Unicon from 'vue-unicons'
import {
    uniEstate,
    uniListUl,
    uniCommentExclamation
} from 'vue-unicons/dist/icons'

const token = store.getters.token

if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

Unicon.add([uniEstate, uniListUl, uniCommentExclamation])

const app = createApp(App)

app.use(store)
app.use(router)
app.use(VueKinesis)
app.use(Unicon)
// app.component('vue-picture-swipe', VuePictureSwipe)
app.mount('#app')