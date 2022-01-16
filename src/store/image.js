import axios from 'axios'

export default {
    namespaced: true,

    state: {},

    mutations: {},

    actions: {
        uploadImages(store, formData) {
            const headers = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            return axios.post(`${process.env.VUE_APP_BASE_URL}/api/images`, formData, headers)
                .catch((error) => {
                    console.log('Image upload failed : ', error)
                })
        },

        editImage(store, [id, payload]) {
            return axios.patch(`${process.env.VUE_APP_BASE_URL}/api/image/${id}`, payload)
                .catch((error) => {
                    console.log('Image edition failed : ', error)
                })
        },

        deleteImage(store, id) {
            return axios.delete(`${process.env.VUE_APP_BASE_URL}/api/image/${id}`)
                .catch((error) => {
                    console.log('Image deletion failed : ', error)
                })
        }
    },
}