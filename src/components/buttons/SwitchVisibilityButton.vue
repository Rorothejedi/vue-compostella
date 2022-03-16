<template>
  <made-up-button
    @click="switchVisible()"
    :loading="loading"
    circle
    small
    :title="isHide ? 'Dévoiler ' : 'Cacher'"
  >
    <eye-icon v-if="isHide" :size="18" />
    <eye-off-icon v-else :size="18" />
  </made-up-button>
</template>

<script>
import { mapActions, mapState } from "vuex";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import EyeIcon from "vue-material-design-icons/Eye.vue";
import EyeOffIcon from "vue-material-design-icons/EyeOff.vue";

export default {
  name: "SwitchVisibilityButton",
  components: { MadeUpButton, EyeIcon, EyeOffIcon },

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

    isHide() {
      return this.album.hide !== 0;
    },
  },

  methods: {
    ...mapActions("album", ["loadAlbums", "editAlbum", "clearAlbumsInfinite"]),

    async switchVisible() {
      if (this.loading) return;

      this.loading = true;

      const edit_params = {
        hide: !this.album.hide,
      };
      const load_params = {
        page: this.albums_meta.current_page,
        per_page: this.albums_meta.per_page,
        sort_by: this.albums_sort,
      };

      await this.editAlbum([this.album.id, edit_params]);
      await this.loadAlbums(load_params);
      await this.clearAlbumsInfinite();

      this.loading = false;
    },
  },
};
</script>