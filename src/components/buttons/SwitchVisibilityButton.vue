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
    ...mapState("album", ["albums_meta"]),

    isHide() {
      return this.album.hide !== 0;
    },
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