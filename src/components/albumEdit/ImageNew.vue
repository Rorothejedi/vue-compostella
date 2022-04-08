<template>
  <div>
    <h3 class="title">Ajout image</h3>

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
        <made-up-button
          class="preview-close"
          title="Retirer cette image"
          @click="removePreview(key)"
          circle
          small
          :disabled="loading"
        >
          <close-icon :size="18" />
        </made-up-button>
      </div>
      <p v-if="images_preview_url.length === 0" class="no-preview">
        Pas de preview
      </p>
    </div>

    <made-up-button
      @click="upload()"
      :disabled="images_files.length === 0"
      :loading="loading"
      small
    >
      Upload
    </made-up-button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import CloseIcon from "vue-material-design-icons/Close.vue";

export default {
  name: "ImageNew",
  components: { MadeUpButton, CloseIcon },

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

      if (this.images_preview_url.length === 0)
        this.$refs.inputFile.value = null;
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
.title {
  margin-top: 0;
  font-family: var(--subtitle-font-family);
}
.preview-box {
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
  margin-bottom: 15px;
}
.preview-content {
  position: relative;
  margin: 0px 2px;
}
.preview-img {
  max-width: 100%;
  width: auto;
  height: 250px;
}
.preview-close {
  position: absolute;
  top: 2px;
  right: 2px;
}
.no-preview {
  font-style: italic;
  font-size: 0.9rem;
}
</style>