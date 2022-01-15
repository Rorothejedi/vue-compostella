<template>
  <button type="button" @click="switchVisible()">
    👁 <span v-if="loading">loading...</span>
  </button>
</template>

<script>
import { mapActions } from "vuex";
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

  methods: {
    ...mapActions("album", ["loadAlbums", "editAlbum"]),

    switchVisible() {
      if (this.loading) return;

      this.loading = true;

      const params = {
        hide: !this.album.hide,
      };

      this.editAlbum([this.album.id, params]).then(() => {
        this.loadAlbums().then(() => {
          this.loading = false;
        });
      });
    },
  },
};
</script>

<style scoped>
</style>