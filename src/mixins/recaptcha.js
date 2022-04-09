import utils from "./utils"

export default {
    mixins: [utils],

    data() {
        return {
            recaptcha_token: '',
            recaptcha_try: 0
        }
    },

    methods: {
        async recaptcha() {
            this.recaptcha_try++

            await this.$recaptchaLoaded()

            await this.$recaptcha('login')
                .then((token) => {
                    this.recaptcha_token = token
                    this.recaptcha_try = 0
                })
                .catch(async (error) => {
                    this.recaptcha_token = ''

                    console.log(`Recaptcha has encoutered an error... Try: ${this.recaptcha_try}/3`)

                    if (this.recaptcha_try < 3) {
                        await this.sleep(1000)
                        return this.recaptcha()
                    }

                    throw new Error('Recaptcha has encoutered an error...', error)
                })
        },
    }
}