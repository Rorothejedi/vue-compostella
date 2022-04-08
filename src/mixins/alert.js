export default {
    methods: {
        confirm(options, callback, callback_params = null, options_alert_after = null) {
            const full_options = {
                ...options,
                cancelButtonText: "Annuler",
                showCancelButton: true,
                showCloseButton: true,
                focusCancel: false,
                showClass: {
                    popup: "animated fade-in",
                },
                hideClass: {
                    popup: "animated fade-out",
                },
                confirmButtonColor: "var(--secondary-text-color)",
                cancelButtonColor: "rgb(226, 226, 226)",
            }

            this.$swal(full_options).then((result) => {
                if (!result.isConfirmed) return;
                if (options_alert_after) this.valid(options_alert_after);

                callback(callback_params);
            })
        },

        valid(options, delay = 4000) {
            const full_options = {
                ...options, // icon, html or text
                showClass: {
                    popup: "animated fade-in",
                },
                hideClass: {
                    popup: "animated fade-out",
                },
                timer: delay,
                timerProgressBar: true,
                showConfirmButton: false,
            }

            this.$swal(full_options)
        },
    }
}