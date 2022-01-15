<template>
  <div>
    <p>Ajout d'image</p>
    <input
      type="file"
      ref="file"
      accept="image/png, image/jpeg, image/jpg"
      multiple
      @change="preview"
    />

    <div>
      <img
        v-for="(image_url, key) in images_preview_url"
        :key="key"
        :src="image_url"
        class="preview"
      />
    </div>

    <br /><br />

    <button @click="upload()">
      Upload <span v-if="loading">loading...</span>
    </button>

    <p>Edition d'image</p>

    <div>
      <img
        v-for="(image, key) in album.images"
        :key="key"
        :src="`${host}/${image.path}`"
        class="preview"
      />
      <!-- <span>{{ image.text }}</span> -->
      <!-- <br /> -->
      <!-- <span>{{ image.main_album_image }}</span> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ImagesManage",
  props: {
    album: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      images_preview_url: [],
      host: "",
    };
  },

  mounted() {
    this.host = process.env.VUE_APP_BASE_URL;
  },

  methods: {
    ...mapActions("image", ["uploadImages"]),
    ...mapActions("album", ["loadAlbum"]),

    preview(e) {
      [...e.target.files].forEach((file, key) => {
        this.images_preview_url[key] = URL.createObjectURL(file);
      });
    },

    upload() {
      if (this.loading) return;

      this.loading = true;

      let formData = new FormData();

      for (let i = 0; i < this.$refs.file.files.length; i++) {
        let file = this.$refs.file.files[i];
        formData.append("images[" + i + "]", file);
      }

      formData.append("album_id", this.album.id);

      this.uploadImages(formData).then(() => {
        this.loadAlbum(this.album.id).then(() => {
          this.loading = false;
          this.images_preview_url = [];
        });
      });
    },
  },
};
</script>

<style scoped>
.preview {
  max-width: 100%;
  width: auto;
  height: 250px;

  padding: 2.5px 5px;
}
</style>