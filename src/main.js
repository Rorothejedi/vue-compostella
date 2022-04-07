import {
    createApp
} from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import {
    VTooltip
} from 'floating-vue'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import {
    VueReCaptcha
} from 'vue-recaptcha-v3'

/* Recaptcha */

const recaptcha_option = {
    siteKey: process.env.VUE_APP_RECAPTCHA_SITEKEY,
    loaderOptions: {
        autoHideBadge: true,
    }
}

/* Authorization header */

const token = store.getters.token

if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

/* Create App */

const app = createApp(App)

app.directive('tooltip', VTooltip)
app.use(store)
app.use(router)
app.use(VueSweetalert2)
app.use(VueReCaptcha, recaptcha_option)
app.mount('#app')