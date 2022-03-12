export default {

    methods: {

        confirm(options, callback, callback_params = null) {
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

                callback(callback_params)
            })
        }
    }
}