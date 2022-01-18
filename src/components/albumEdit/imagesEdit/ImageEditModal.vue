<template>
  <div>
    <modal v-model="modal">
      <template v-slot:header>
        ID : {{ image_to_edit.id }} <divider smallMargin /> Image :
        {{ image_to_edit.path }}
      </template>

      <template v-slot:default>
        <p class="modal-date">
          Créer le {{ formatDatetime(image_to_edit.created_at) }} <br />
          <span v-if="image_to_edit.updated_at">
            Dernière modification le
            {{ formatDatetime(image_to_edit.updated_at) }}
          </span>
        </p>

        <div class="modal-content-image">
          <img :src="`${host}/${image_to_edit.path}`" class="modal-image" />
        </div>

        <label for="image_text">Texte:</label>
        <textarea
          v-model="image.text"
          id="image_text"
          type="text"
          placeholder="ex: blabla"
        ></textarea>

        <input
          v-model="image.main_album_image"
          type="checkbox"
          id="image_main"
        />
        <label for="image_main"> Image principale de l'album</label>
      </template>

      <template v-slot:footer>
        <button type="button" @click="updateImage()">
          Modifier <span v-if="loading_edit">loading...</span>
        </button>
        <button type="button" @click="$emit('removeImage', image_to_edit.id)">
          Supprimer
          <span v-if="loading_delete">loading...</span>
        </button>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "@/components/utils/Modal.vue";
import Divider from "@/components/utils/Divider.vue";
import date from "@/mixins/date";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "ImageEditModal",
  components: { Modal, Divider },
  mixins: [date],

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
    loading_delete: {
      type: Boolean,
      default: false,
      required: true,
    },
  },

  data() {
    return {
      loading_edit: false,
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

  methods: {
    ...mapActions("image", ["editImage"]),
    ...mapActions("album", ["loadAlbum"]),

    updateImage() {
      if (this.loading_edit) return;

      this.loading_edit = true;

      const payload = {
        text: this.image_to_edit.text,
        main_album_image: this.image_to_edit.main_album_image,
      };

      this.editImage([this.image_to_edit.id, payload]).then(() => {
        this.loadAlbum(this.album.id).then(() => {
          this.modal = false;
          this.image = {};
          this.loading_edit = false;
        });
      });
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
  width: 100%;
  height: 100px;
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