<template>
  <made-up-button
    @click="confirmSwitchVisible()"
    :loading="loading"
    v-bind="$props"
  >
    <span v-if="full">Changer la visibilité</span>
    <eye-icon v-else-if="isHide" :size="18" />
    <eye-off-icon v-else :size="18" />
  </made-up-button>
</template>

<script>
import { mapActions, mapState } from "vuex";
import alert from "@/mixins/alert.js";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import EyeIcon from "vue-material-design-icons/Eye.vue";
import EyeOffIcon from "vue-material-design-icons/EyeOff.vue";

export default {
  name: "SwitchVisibilityButton",
  mixins: [alert],
  components: { MadeUpButton, EyeIcon, EyeOffIcon },

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

    isHide() {
      return this.album.hide !== 0;
    },
  },

  methods: {
    ...mapActions("album", [
      "loadAlbums",
      "editAlbum",
      "clearAlbumsInfinite",
      "clearAlbumsSimple",
    ]),

    async confirmSwitchVisible() {
      if (this.loading) return;

      let options = {
        icon: "warning",
        html: `Voulez-vous changer la visibilité de l'album n°<strong>${this.album.id}</strong> ?<br />`,
        confirmButtonText: "Changer visibilité",
      };

      if (!(await this.confirm(options))) return;

      this.switchVisible();
    },

    async switchVisible() {
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
      await this.clearAlbumsSimple();

      this.loading = false;
    },
  },
};
</script>