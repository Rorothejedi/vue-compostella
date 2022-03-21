<template>
  <div>
    <div v-if="!loading">
      <div v-for="album in albums" :key="album.id" class="album">
        <router-link
          :to="`/album-edit/${album.id}`"
          class="album-link"
          :class="{ 'album-hide': album.hide }"
        >
          <div>
            {{ album.place_departure }}
            <arrow-right-icon :size="12" />
            {{ album.place_arrival }}
          </div>
          <div>
            Total: {{ album.km_total }} km / Etape: {{ album.km_step }} km
          </div>

          <div>Le {{ formatDate(album.date) }}</div>
        </router-link>
        <div>
          <switch-visibility-button
            :album="album"
            class="action-button"
            small
            circle
          />
          <delete-button :album="album" small circle />
        </div>
      </div>

      <div class="pagination-buttons">
        <made-up-button
          @click="previousPage()"
          :disabled="albums_meta.current_page <= 1"
        >
          Précédent
        </made-up-button>

        <div>
          {{ albums_meta.current_page }}
        </div>

        <made-up-button
          @click="nextPage()"
          :disabled="albums_meta.current_page >= albums_meta.last_page"
        >
          Suivant
        </made-up-button>
      </div>
    </div>

    <div class="loading-list" v-else>
      <div class="loading">
        <sync-icon class="loading-icon" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import date from "@/mixins/date.js";
import SwitchVisibilityButton from "@/components/buttons/SwitchVisibilityButton.vue";
import DeleteButton from "@/components/buttons/DeleteButton.vue";
import MadeUpButton from "@/components/utils/MadeUpButton.vue";
import ArrowRightIcon from "vue-material-design-icons/ArrowRight.vue";
import SyncIcon from "vue-material-design-icons/Sync.vue";

export default {
  name: "AlbumList",
  components: {
    SwitchVisibilityButton,
    DeleteButton,
    MadeUpButton,
    ArrowRightIcon,
    SyncIcon,
  },
  mixins: [date],

  data() {
    return {
      loading: false,
      page: 1,
    };
  },

  computed: {
    ...mapState("album", ["albums", "albums_meta", "albums_sort"]),
  },

  mounted() {
    if (Object.values(this.albums).length === 0) this.fetchAlbums();
  },

  methods: {
    ...mapActions("album", ["loadAlbums"]),

    fetchAlbums() {
      if (this.loading) return;

      this.loading = true;

      const params = {
        page: this.page,
        per_page: this.albums_meta.per_page,
        sort_by: this.albums_sort,
      };

      this.loadAlbums(params).then(() => {
        this.page = this.albums_meta.current_page;
        this.loading = false;
      });
    },

    previousPage() {
      if (this.loading) return;

      this.page--;
      this.fetchAlbums();
    },

    nextPage() {
      if (this.loading) return;

      this.page++;
      this.fetchAlbums();
    },
  },
};
</script>

<style scoped>
.album {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 2px;
  transition: background-color 0.3s ease;
}
.album:hover {
  background-color: var(--main-text-color);
  transition: background-color 0.3s ease;
}
.album-hide {
  opacity: 0.5;
}
.album-link {
  text-decoration: none;
  color: var(--dark-text-color);
}
.header {
  display: flex;
}

.action-button {
  margin-right: 3px;
}

.pagination-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  margin-top: 10px;
  border-top: grey dashed 1px;
}

.loading-list {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
}

.loading {
  animation: spin 2s infinite linear;
}
.loading-icon {
  display: flex;
}
</style>