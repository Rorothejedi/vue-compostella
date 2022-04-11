<template>
  <div>
    <made-up-button
      @click="sortAlbums()"
      :loading="loading_sort || loading_per_page"
      :disabled="loading_per_page"
      icon
      small
      title="Trier"
    >
      <sort-ascending-icon v-if="albums_sort === 'asc'" :size="18" />
      <sort-descending-icon v-else :size="18" />
    </made-up-button>

    <select
      v-model="per_page"
      class="per-page-select"
      @change="perPageAlbums()"
      :disabled="loading_sort || loading_per_page"
    >
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
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
      loading_sort: false,
      loading_per_page: false,
      per_page: "10",
    };
  },

  computed: {
    ...mapState("album", ["albums", "albums_meta", "albums_sort"]),
  },

  mounted() {
    this.per_page = this.albums_meta.per_page;
  },

  methods: {
    ...mapActions("album", ["loadAlbums"]),

    async sortAlbums() {
      if (this.loading_sort || this.loading_per_page) return;

      this.loading_sort = true;

      store.commit("album/SET_ALBUMS_SORT");

      const params = {
        page: this.albums_meta.current_page,
        per_page: this.albums_meta.per_page,
        sort_by: this.albums_sort,
      };

      await this.loadAlbums(params);

      this.loading_sort = false;
    },

    async perPageAlbums() {
      if (this.loading_sort || this.loading_per_page) return;

      this.loading_per_page = true;

      store.commit("album/SET_ALBUMS_META", {
        current_page: 1,
        last_page: 1,
        per_page: this.per_page,
      });

      const params = {
        page: this.albums_meta.current_page,
        per_page: this.albums_meta.per_page,
        sort_by: this.albums_sort,
      };

      await this.loadAlbums(params);

      this.loading_per_page = false;
    },
  },
};
</script>

<style scoped>
.per-page-select {
  margin-left: 10px;
  padding-left: 5px;
  height: 28px;
  border-radius: 4px;
  border-style: none;
  color: var(--main-text-color);
  background-color: var(--button-bg-color);
}
</style>