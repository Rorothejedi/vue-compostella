<template>
  <div class="image-box">
    <div v-for="(image, key) in album.images" :key="key" class="image-content">
      <img
        :src="`${host}/${image.path}`"
        class="images"
        :class="{ 'main-image': image.main_album_image }"
        @click="$emit('openModal', image)"
      />
      <made-up-button
        v-if="key !== 0"
        class="arrow-left"
        @click="moveImageToLeft(image.id, key + 1)"
        :loading="loading_move_left[image.id]"
        small
        circle
      >
        <arrow-left-icon :size="18" />
      </made-up-button>

      <made-up-button
        v-if="key !== album.images.length - 1"
        class="arrow-right"
        @click="moveImageToRight(image.id, key + 1)"
        :loading="loading_move_right[image.id]"
        small
        circle
      >
        <arrow-right-icon :size="18" />
      </made-up-button>
      <span
        v-if="image.text !== null"
        class="with-text"
        v-tooltip="'Contient du texte'"
      >
        <note-text-outline-icon :size="18" />
      </span>

      <made-up-button
        class="image-delete"
        v-tooltip="'Supprimer l\'image'"
        @click="$emit('removeImage', image.id)"
        small
        circle
        :loading="loading_delete[image.id]"
      >
        <close-icon :size="18" />
      </made-up-button>
    </div>
    <p
      v-if="album.images !== undefined && album.images.length === 0"
      class="no-image"
    >
      Pas d'image
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import CloseIcon from "vue-material-design-icons/Close.vue";
import ArrowLeftIcon from "vue-material-design-icons/ArrowLeft.vue";
import ArrowRightIcon from "vue-material-design-icons/ArrowRight.vue";
import NoteTextOutlineIcon from "vue-material-design-icons/NoteTextOutline.vue";

export default {
  name: "ImageEditGrid",
  components: {
    MadeUpButton,
    CloseIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    NoteTextOutlineIcon,
  },
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
  width: auto;
  max-width: 100%;
  height: 250px;
  cursor: pointer;
}
.main-image {
  background-color: white;
  border: 1px solid white;
  height: 248px;
}

/* image */

.image-box {
  display: flex;
  flex-wrap: wrap;
}
.image-content {
  position: relative;
  margin: 0px 2px;
}

/* image icons */

.arrow-left,
.arrow-right {
  position: absolute;
  top: calc(50% - 14px);
}
.arrow-left {
  left: 2px;
}
.arrow-right {
  right: 2px;
}
.with-text {
  position: absolute;
  background-color: white;
  cursor: default;
  color: var(--main-text-color);
  top: 0;
  left: 0;
  padding: 5px 4px 1px 4px;
  border-radius: 0 0 4px 0;
}
.image-delete {
  position: absolute;
  top: 2px;
  right: 2px;
}

.no-image {
  font-style: italic;
  font-size: 0.9rem;
}
</style>