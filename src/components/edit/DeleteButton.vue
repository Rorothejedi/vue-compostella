<template>
  <button type="button" @click="removeAlbum()">
    ✖ <span v-if="loading">loading...</span>
  </button>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "DeleteButton",
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