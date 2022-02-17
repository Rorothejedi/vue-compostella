<template>
  <div>
    <made-up-button
      @click="sortAlbums()"
      :loading="loading"
      icon
      small
      title="Trier"
    >
      <sort-ascending-icon v-if="albums_sort === 'asc'" :size="18" />
      <sort-descending-icon v-else :size="18" />
    </made-up-button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import SortAscendingIcon from "vue-material-design-icons/SortAscending.vue";
import SortDescendingIcon from "vue-material-design-icons/SortDescending.vue";
import store from "../../store";

export default {
  name: "AlbumSort",
  components: {
    MadeUpButton,
    SortAscendingIcon,
    SortDescendingIcon,
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState("album", ["albums", "albums_meta", "albums_sort"]),
  },

  methods: {
    ...mapActions("album", ["loadAlbums"]),

    sortAlbums() {
      if (this.loading) return;

      this.loading = true;

      store.commit("album/SET_ALBUMS_SORT");

      const params = {
        page: this.albums_meta.current_page,
        per_page: this.albums_meta.per_page,
        sort_by: this.albums_sort,
      };

      this.loadAlbums(params).then(() => {
        this.loading = false;
      });
    },
  },
};
</script>