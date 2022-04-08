<template>
  <div>
    <p>Ajout d'image</p>

    <input
      type="file"
      ref="inputFile"
      accept="image/png, image/jpeg, image/jpg"
      multiple
      @change="preview"
    />

    <div class="preview-box">
      <div
        v-for="(image_url, key) in images_preview_url"
        :key="key"
        class="preview-content"
      >
        <img :src="image_url" class="preview-img" />
        <span
          class="preview-close"
          title="Retirer cette image"
          @click="removePreview(key)"
        >
          ✖
        </span>
      </div>
    </div>

    <br /><br />

    <button @click="upload()" :disabled="images_files.length === 0">
      Upload <span v-if="loading">loading...</span>
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ImageNew",

  data() {
    return {
      loading: false,
      images_preview_url: [],
      images_files: [],
    };
  },

  computed: {
    ...mapState("album", ["album"]),
  },

  methods: {
    ...mapActions("image", ["uploadImages"]),
    ...mapActions("album", ["loadAlbum"]),

    preview(e) {
      [...e.target.files].forEach((file, key) => {
        this.images_preview_url[key] = URL.createObjectURL(file);
        this.images_files[key] = file;
      });
    },

    removePreview(key) {
      this.images_preview_url.splice(key, 1);
      this.images_files.splice(key, 1);
    },

    async upload() {
      if (this.loading || this.images_files.length === 0) return;

      this.loading = true;

      let formData = new FormData();

      this.images_files.forEach((images_file, key) => {
        formData.append(`images[${key}]`, images_file);
      });

      formData.append("album_id", this.album.id);

      await this.uploadImages(formData);
      await this.loadAlbum(this.album.id);

      this.images_preview_url = [];
      this.images_files = [];
      this.$refs.inputFile.value = null;
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.preview-box {
  display: flex;
  flex-wrap: wrap;
}
.preview-content {
  position: relative;
  margin: 5px;
}
.preview-img {
  max-width: 100%;
  width: auto;
  height: 250px;
}
.preview-close {
  position: absolute;
  top: 0;
  right: 0;
  color: black;
  cursor: pointer;
  background-color: white;
  padding: 5px 7px;
  margin: 3px;
  border-radius: 15px;
}
</style>