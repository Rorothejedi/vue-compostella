export default {

    data() {
        return {
            options_confirm: {
                cancelButtonText: "Annuler",
                showCancelButton: true,
                showCloseButton: true,
                focusCancel: false,
                confirmButtonColor: "var(--secondary-text-color)",
                cancelButtonColor: "rgb(226, 226, 226)",
            },

            options_valid: {
                timerProgressBar: true,
                showConfirmButton: false,
            },

            options_animated: {
                showClass: {
                    popup: "animated fade-in",
                },
                hideClass: {
                    popup: "animated fade-out",
                },
            }
        }
    },

    methods: {
        confirm(options, options_alert_after = null) {
            return new Promise((resolve) => {
                const full_options = {
                    ...options,
                    ...this.options_confirm,
                    ...this.options_animated
                }

                this.$swal(full_options).then((result) => {
                    if (!result.isConfirmed) resolve(false);
                    if (options_alert_after) this.valid(options_alert_after);

                    resolve(true)
                })
            })
        },

        valid(options, delay = 4000) {
            const full_options = {
                ...options, // icon, html or text
                ...this.options_valid,
                ...this.options_animated,
                delay: delay,
            }

            this.$swal(full_options)
        },
    }
}