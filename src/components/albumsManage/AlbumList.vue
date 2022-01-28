<template>
  <div>
    <div v-if="!loading">
      <div v-for="album in albums" :key="album.id" class="album">
        <router-link
          :to="`/album-edit/${album.id}`"
          class="album-link"
          :class="{ 'album-hide': album.hide }"
        >
          <div>{{ album.place_departure }} → {{ album.place_arrival }}</div>
          <div>
            Total: {{ album.km_total }} km / Etape: {{ album.km_step }} km
          </div>

          <div>Le {{ formatDate(album.date) }}</div>
        </router-link>
        <div>
          <switch-visibility-button :album="album" />
          <delete-button :album="album" />
        </div>
      </div>

      <div class="pagination-buttons">
        <div>
          <button @click="previousPage()" v-if="albums_meta.current_page > 1">
            Précédent
          </button>
        </div>

        <div>
          <button
            @click="nextPage()"
            v-if="albums_meta.current_page < albums_meta.last_page"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import date from "@/mixins/date.js";
import SwitchVisibilityButton from "@/components/buttons/SwitchVisibilityButton.vue";
import DeleteButton from "@/components/buttons/DeleteButton.vue";

export default {
  name: "AlbumList",
  components: { SwitchVisibilityButton, DeleteButton },
  mixins: [date],

  data() {
    return {
      loading: false,
      page: 1,
    };
  },

  computed: {
    ...mapState("album", ["albums", "albums_meta"]),
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
        per_page: 15,
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
button {
  cursor: pointer;
}

.pagination-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  padding-top: 30px;
  border-top: white solid 1px;
}
</style>