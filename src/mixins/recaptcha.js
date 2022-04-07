export default {

    data() {
        return {
            recaptcha_token: "",
        }
    },

    methods: {
        async recaptcha() {
            await this.$recaptchaLoaded();

            await this.$recaptcha('login')
                .then((token) => {
                    this.recaptcha_token = token
                })
                .catch((error) => {
                    this.recaptcha_token = ''

                    throw new Error('Recaptcha has encoutered an error...', error)
                })
        },
    }
}