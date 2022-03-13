<template>
  <made-up-button
    @click="confirmRemove()"
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
import alert from "@/mixins/alert.js";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import CloseIcon from "vue-material-design-icons/Close.vue";

export default {
  name: "DeleteButton",
  mixins: [alert],
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
    ...mapState("album", ["albums_meta", "albums_sort"]),
  },

  methods: {
    ...mapActions("album", ["loadAlbums", "deleteAlbum"]),

    confirmRemove() {
      if (this.loading) return;

      let options = {
        icon: "warning",
        html:
          `Voulez-vous supprimer l'album ${this.album.id} ?<br />` +
          `De <strong>${this.album.place_departure}</strong><br />` +
          `à <strong> ${this.album.place_arrival}</strong><br />`,
        confirmButtonText: "Supprimer",
      };

      this.confirm(options, this.removeAlbum);
    },

    removeAlbum() {
      this.loading = true;

      const load_params = {
        page: this.albums_meta.current_page,
        per_page: this.albums_meta.per_page,
        sort_by: this.albums_sort,
      };

      this.deleteAlbum(this.album.id).then(() => {
        this.loadAlbums(load_params).then(() => {
          this.loading = false;
          this.$router.push("/albums-manage");
        });
      });
    },
  },
};
</script>