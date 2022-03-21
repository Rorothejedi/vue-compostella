<template>
  <made-up-button
    @click="confirmRemove()"
    :loading="loading"
    v-bind="$props"
    title="Supprimer"
  >
    <span v-if="full">Supprimer l'album</span>
    <close-icon v-else :size="18" />
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
    full: {
      type: Boolean,
      required: false,
      default: false,
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
    ...mapActions("album", [
      "loadAlbums",
      "deleteAlbum",
      "clearAlbumsInfinite",
    ]),

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

    async removeAlbum() {
      this.loading = true;

      const load_params = {
        page: this.albums_meta.current_page,
        per_page: this.albums_meta.per_page,
        sort_by: this.albums_sort,
      };

      const isHide = this.album.hide;

      await this.deleteAlbum(this.album.id);
      await this.loadAlbums(load_params);

      if (!isHide) await this.clearAlbumsInfinite();

      this.loading = false;
      this.$router.push("/albums-manage");
    },
  },
};
</script>