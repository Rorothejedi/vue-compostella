<template>
  <button type="button" @click="switchVisible()">
    👁 <span v-if="loading">loading...</span>
  </button>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "SwitchVisibilityButton",
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
    ...mapActions("album", ["loadAlbums", "editAlbum"]),

    switchVisible() {
      if (this.loading) return;

      this.loading = true;

      const params = {
        hide: !this.album.hide,
      };

      this.editAlbum([this.album.id, params]).then(() => {
        this.loadAlbums({ page: this.albums_meta.current_page }).then(() => {
          this.loading = false;
        });
      });
    },
  },
};
</script>

<style scoped>
</style>