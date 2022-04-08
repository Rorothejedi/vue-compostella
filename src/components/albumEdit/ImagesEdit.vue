<template>
  <div>
    <h3 class="title">Edition d'image</h3>

    <image-edit-grid
      :loading_delete="loading_delete"
      @remove-image="confirmRemoveImage"
      @open-modal="openEditImageModal"
    />

    <image-edit-modal
      v-model:show_modal="show_modal"
      v-model:image_to_edit="image_to_edit"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import alert from "@/mixins/alert";
import date from "@/mixins/date";
import ImageEditGrid from "@/components/albumEdit/imagesEdit/ImageEditGrid.vue";
import ImageEditModal from "@/components/albumEdit/imagesEdit/ImageEditModal.vue";

export default {
  name: "ImagesEdit",
  components: { ImageEditGrid, ImageEditModal },
  mixins: [alert, date],

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

    confirmRemoveImage(image_id) {
      if (this.loading_delete[image_id]) return;

      let options = {
        icon: "warning",
        html: `Voulez-vous vraiment supprimer cette image ?<br />`,
        confirmButtonText: "Supprimer",
      };

      this.confirm(options, this.removeImage, image_id);
    },

    async removeImage(image_id) {
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
.title {
  font-family: var(--subtitle-font-family);
}
</style>