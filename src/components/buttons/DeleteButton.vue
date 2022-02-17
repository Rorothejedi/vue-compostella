<template>
  <made-up-button
    @click="removeAlbum()"
    :loading="loading"
    circle
    small
    title="Supprimer"
  >
    <close-icon :size="18" />
  </made-up-button>
</template>

<script>
import { mapActions, mapState } from "vuex";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import CloseIcon from "vue-material-design-icons/Close.vue";

export default {
  name: "DeleteButton",
  components: {
    MadeUpButton,
    CloseIcon,
  },

  props: {
    album: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState("album", ["albums_meta"]),
  },

  methods: {
    ...mapActions("album", ["loadAlbums", "deleteAlbum"]),

    removeAlbum() {
      if (this.loading) return;

      this.loading = true;

      this.deleteAlbum(this.album.id).then(() => {
        this.loadAlbums({ page: this.albums_meta.current_page }).then(() => {
          this.loading = false;
          this.$router.push("/albums-manage");
        });
      });
    },
  },
};
</script>