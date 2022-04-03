export default {

    data() {
        return {
            recaptcha_token: "",
        }
    },

    methods: {
        async recaptcha() {
            await this.$recaptchaLoaded();

            this.recaptcha_token = await this.$recaptcha("login");
        },
    }
}