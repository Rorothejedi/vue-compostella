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

    <!-- Images list for edit -->

    <p>Edition d'image</p>

    <div class="image-box" v-if="!loading">
      <div
        v-for="(image, key) in imagesByOrder"
        :key="key"
        class="image-content"
      >
        <img
          :src="`${host}/${image.path}`"
          class="images"
          :class="{ 'main-image': image.main_album_image }"
          @click="openEditImageModal(image)"
        />
        <span
          v-if="key !== 0"
          class="arrow-left"
          @click="moveImage(image.id, key - 1)"
        >
          ←
        </span>
        <span
          v-if="key !== imagesByOrder.length - 1"
          class="arrow-right"
          @click="moveImage(image.id, key + 1)"
        >
          →
        </span>
        <span
          v-if="image.text !== null"
          class="with-text"
          title="Contient du texte"
        >
          🖹
        </span>
      </div>
    </div>

    <!-- Modal : edit image -->

    <modal v-model="show_modal">
      <form>
        <p>{{ image_to_edit.path }}</p>
        <p>
          Créer le {{ image_to_edit.created_at }} <br />
          <span v-if="image_to_edit.updated_at">
            Dernière modification le {{ image_to_edit.updated_at }}
          </span>
        </p>

        <img :src="`${host}/${image_to_edit.path}`" class="images" />

        <br />
        <label for="image_text">Texte:</label>
        <br />
        <textarea
          v-model="image_to_edit.text"
          id="image_text"
          type="text"
          placeholder="ex: blabla"
          cols="40"
          rows="5"
        ></textarea>
        <br /><br />
        <input
          v-model="image_to_edit.main_album_image"
          type="checkbox"
          id="image_main"
        />
        <label for="image_main"> Image principale de l'album</label>

        <br /><br />

        <button type="button" @click="updateImage()">
          Modifier <span v-if="loading_edit">loading...</span>
        </button>
        <button type="button" @click="removeImage()">
          Supprimer <span v-if="loading_delete">loading...</span>
        </button>
      </form>
    </modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Modal from "@/components/utils/Modal.vue";

export default {
  name: "ImagesManage",
  components: { Modal },
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
      images_files: [],
      host: "",

      show_modal: false,
      image_to_edit: {},

      loading_edit: false,
      loading_delete: false,
    };
  },

  computed: {
    imagesByOrder() {
      let images = this.album.images;

      if (images === undefined) return {};

      return images.sort((a, b) => a.album_order - b.album_order);
    },
  },

  mounted() {
    this.host = process.env.VUE_APP_BASE_URL;
  },

  methods: {
    ...mapActions("image", ["uploadImages", "editImage", "deleteImage"]),
    ...mapActions("album", ["loadAlbum"]),

    /* Preview */

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

    /* Server upload */

    upload() {
      if (this.loading || this.images_files.length === 0) return;

      this.loading = true;

      let formData = new FormData();

      this.images_files.forEach((images_file, key) => {
        formData.append(`images[${key}]`, images_file);
      });

      formData.append("album_id", this.album.id);

      this.uploadImages(formData).then(() => {
        this.loadAlbum(this.album.id).then(() => {
          this.images_preview_url = [];
          this.images_files = [];
          this.$refs.inputFile.value = null;

          this.loading = false;
        });
      });
    },

    /* Edit image */

    openEditImageModal(image) {
      this.show_modal = true;
      this.image_to_edit = image;
    },

    updateImage() {
      if (this.loading_edit) return;

      this.loading_edit = true;

      const payload = {
        text: this.image_to_edit.text,
        main_album_image: this.image_to_edit.main_album_image,
      };

      this.editImage([this.image_to_edit.id, payload]).then(() => {
        this.loadAlbum(this.album.id).then(() => {
          this.show_modal = false;
          this.image_to_edit = {};
          this.loading_edit = false;
        });
      });
    },

    removeImage() {
      if (this.loading_delete) return;

      this.loading_delete = true;
      this.deleteImage(this.image_to_edit.id).then(() => {
        this.loadAlbum(this.album.id).then(() => {
          this.show_modal = false;
          this.image_to_edit = {};
          this.loading_delete = false;
        });
      });
    },

    moveImage(image_id, new_key) {
      const payload = {
        album_order: new_key,
      };

      this.editImage([image_id, payload]).then(() => {
        this.loadAlbum(this.album.id).then(() => {
          console.log("OK !");
        });
      });
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

.images {
  max-width: 100%;
  width: auto;
  height: 250px;

  padding: 2.5px 5px;
  cursor: pointer;
}
.main-image {
  background-color: white;
  border-radius: 5px;
}

/** image */

.image-box {
  display: flex;
  flex-wrap: wrap;
}
.image-content {
  position: relative;
}

/* Image icons */
.arrow-left,
.arrow-right {
  position: absolute;
  cursor: pointer;
  top: 47%;
  background-color: white;
  color: black;
  padding: 5px 7px;
  margin: 0 7px;
  border-radius: 15px;
}
.arrow-left {
  left: 0;
}
.arrow-right {
  right: 0;
}
.with-text {
  position: absolute;
  background-color: white;
  color: black;
  top: 0;
  left: 0;
  padding: 5px 7px;
  margin: 3px 5px;
  border-radius: 0 0 5px 0;
}
</style>