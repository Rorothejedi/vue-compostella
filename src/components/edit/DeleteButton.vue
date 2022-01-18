<template>
  <button type="button" @click="removeAlbum()">
    ✖ <span v-if="loading">loading...</span>
  </button>
</template>

<script>
import { mapActions } from "vuex";
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

  methods: {
    ...mapActions("album", ["loadAlbums", "deleteAlbum"]),

    removeAlbum() {
      if (this.loading) return;

      this.loading = true;

      this.deleteAlbum(this.album.id).then(() => {
        this.loadAlbums().then(() => {
          this.loading = false;
          this.$router.push("/dashboard");
        });
      });
    },
  },
};
</script>