<template>
  <div>
    <p>Edition d'image</p>

    <image-edit-grid
      :loading_delete="loading_delete"
      @remove-image="removeImage"
      @open-modal="openEditImageModal"
    />

    <image-edit-modal
      v-model:show_modal="show_modal"
      v-model:image_to_edit="image_to_edit"
      :loading_delete="loading_delete[image_to_edit.id]"
      @remove-image="removeImage"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import date from "@/mixins/date";
import ImageEditGrid from "@/components/albumEdit/imagesEdit/ImageEditGrid.vue";
import ImageEditModal from "@/components/albumEdit/imagesEdit/ImageEditModal.vue";

export default {
  name: "ImagesEdit",
  components: { ImageEditGrid, ImageEditModal },
  mixins: [date],

  data() {
    return {
      show_modal: false,
      image_to_edit: {},
      loading_delete: [],
    };
  },

  computed: {
    ...mapState("album", ["album"]),
  },

  methods: {
    ...mapActions("image", ["editImage", "deleteImage"]),
    ...mapActions("album", ["loadAlbum"]),

    openEditImageModal(image) {
      this.show_modal = true;
      this.image_to_edit = image;
    },

    async removeImage(image_id) {
      if (this.loading_delete[image_id]) return;

      this.loading_delete[image_id] = true;

      await this.deleteImage(image_id);
      await this.loadAlbum(this.album.id);

      if (this.show_modal) {
        this.show_modal = false;
        this.image_to_edit = {};
      }
      this.loading_delete[image_id] = false;
    },
  },
};
</script>

<style scoped>
</style>