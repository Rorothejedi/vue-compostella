<template>
  <div class="image-box">
    <div v-for="(image, key) in album.images" :key="key" class="image-content">
      <img
        :src="`${host}/${image.path}`"
        class="images"
        :class="{ 'main-image': image.main_album_image }"
        @click="$emit('openModal', image)"
      />
      <span
        v-if="key !== 0"
        class="arrow-left"
        @click="moveImageToLeft(image.id, key)"
      >
        ← <span v-if="loading_move_left[image.id]">loading...</span>
      </span>
      <span
        v-if="key !== album.images.length - 1"
        class="arrow-right"
        @click="moveImageToRight(image.id, key)"
      >
        → <span v-if="loading_move_right[image.id]">loading...</span>
      </span>
      <span
        v-if="image.text !== null"
        class="with-text"
        title="Contient du texte"
      >
        🖹
      </span>
      <span
        class="image-delete"
        title="Supprimer l'image"
        @click="$emit('removeImage', image.id)"
      >
        ✖ <span v-if="loading_delete[image.id]">loading...</span>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "ImageEditGrid",

  props: {
    loading_delete: {
      type: Array,
      default: () => [],
      required: true,
    },
  },

  data() {
    return {
      loading_move_left: [],
      loading_move_right: [],
    };
  },

  computed: {
    ...mapGetters(["host"]),
    ...mapState("album", ["album"]),
  },

  methods: {
    ...mapActions("album", ["loadAlbum"]),
    ...mapActions("image", ["editImage"]),

    async moveImageToLeft(image_id, key) {
      if (this.loading_move_left[image_id]) return;

      this.loading_move_left[image_id] = true;

      const payload = {
        album_order: key - 1,
      };

      await this.editImage([image_id, payload]);
      await this.loadAlbum(this.album.id);

      this.loading_move_left[image_id] = false;
    },

    async moveImageToRight(image_id, key) {
      if (this.loading_move_right[image_id]) return;

      this.loading_move_right[image_id] = true;

      const payload = {
        album_order: key + 1,
      };

      await this.editImage([image_id, payload]);
      await this.loadAlbum(this.album.id);

      this.loading_move_right[image_id] = false;
    },
  },
};
</script>

<style scoped>
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

/* image */

.image-box {
  display: flex;
  flex-wrap: wrap;
}
.image-content {
  position: relative;
}

/* image icons */

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
.image-delete {
  position: absolute;
  cursor: pointer;
  color: black;
  background-color: white;
  border-radius: 15px;
  padding: 5px 8px;
  margin: 5px 7px;
  top: 0;
  right: 0;
}
</style>