import axios from 'axios'

export default {
    namespaced: true,

    state: {
        images: {}
    },

    mutations: {

    },

    actions: {
        uploadImages(store, formData) {
            return axios.post(`${process.env.VUE_APP_BASE_URL}/api/images`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((response) => {
                    console.log('Images upload response : ', response)
                })
                .catch((error) => {
                    console.log('Image upload failed : ', error)
                })
        }
    },
}