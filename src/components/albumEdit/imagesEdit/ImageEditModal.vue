<template>
  <div>
    <modal
      v-model="modal"
      :title="`ID : ${image_to_edit.id} | ${image_to_edit.path}`"
    >
      <template v-slot:default>
        <div class="modal-content-image">
          <img :src="`${host}/${image_to_edit.path}`" class="modal-image" />
        </div>

        <br />

        <label for="image_text">Texte:</label>
        <made-up-textarea
          v-model="text"
          id="image_text"
          placeholder="ex: blabla"
        />

        <input v-model="main_album_image" type="checkbox" id="image_main" />
        <label for="image_main">Image principale de l'album</label>
      </template>

      <template v-slot:footer>
        <made-up-button @click="updateImage()" :loading="loading_edit" small>
          Modifier
        </made-up-button>
        <made-up-button @click="cancel()" small>Annuler</made-up-button>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "@/components/utils/Modal.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import MadeUpTextarea from "@/components/utils/MadeUpTextarea.vue";

export default {
  name: "ImageEditModal",
  components: { Modal, MadeUpButton, MadeUpTextarea },
  props: {
    show_modal: {
      type: Boolean,
      default: false,
      required: true,
    },
    image_to_edit: {
      type: Object,
      default: () => {},
      required: true,
    },
  },

  data() {
    return {
      loading_edit: false,
      text: "",
      main_album_image: null,
    };
  },

  computed: {
    ...mapGetters(["host"]),
    ...mapState("album", ["album"]),

    modal: {
      get() {
        return this.show_modal;
      },
      set(value) {
        this.$emit("update:show_modal", value);
      },
    },
    image: {
      get() {
        return this.image_to_edit;
      },
      set(value) {
        this.$emit("update:image_to_edit", value);
      },
    },
  },

  watch: {
    image_to_edit() {
      this.setState();
    },
  },

  methods: {
    ...mapActions("image", ["editImage"]),
    ...mapActions("album", ["loadAlbum"]),

    async updateImage() {
      if (this.loading_edit) return;

      this.loading_edit = true;

      const payload = {
        text: this.text,
        main_album_image: this.main_album_image,
      };

      await this.editImage([this.image_to_edit.id, payload]);
      await this.loadAlbum(this.album.id);

      this.modal = false;
      this.image = {};
      this.loading_edit = false;
    },

    setState() {
      this.text = this.image_to_edit.text;
      this.main_album_image = this.image_to_edit.main_album_image;
    },

    cancel() {
      this.setState();
      this.modal = false;
    },
  },
};
</script>

<style scoped>
.modal-date {
  font-size: small;
  font-style: italic;
}
#image_text {
  margin-bottom: 10px;
}
.modal-content-image {
  display: flex;
  justify-content: center;
}
.modal-image {
  max-width: 100%;
  width: auto;
  height: 250px;
}
</style>