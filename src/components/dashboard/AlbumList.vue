<template>
  <div>
    <TitleLine title="Liste des albums" dark />

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

          <div>Date: {{ album.date }}</div>
        </router-link>
        <div>
          <button type="button" @click="switchVisible(album.id, !album.hide)">
            👁 <span v-if="loadingVisible[album.id]">loading...</span>
          </button>
          <button type="button" @click="removeAlbum(album.id)">
            ✖ <span v-if="loadingDelete[album.id]">loading...</span>
          </button>
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

// TODO
// gérer la pagination (10 albums par page)
// gérer le order_by (sort) pour pouvoir trier

// ajouter barre de recherche d'album
// ajouter une confirmation de suppression
// ajouter moment pour formater la date

<script>
import { mapActions, mapState } from "vuex";
import TitleLine from "@/components/utils/TitleLine.vue";

export default {
  name: "AlbumList",
  components: { TitleLine },

  data() {
    return {
      loading: false,
      loadingDelete: [],
      loadingVisible: [],
      page: 1,
    };
  },

  computed: {
    ...mapState("album", ["albums"]),
  },

  mounted() {
    if (Object.values(this.albums).length === 0) this.fetchAlbums();
  },

  methods: {
    ...mapActions("album", ["loadAlbums", "deleteAlbum", "editAlbum"]),

    fetchAlbums() {
      this.loading = true;
      this.loadAlbums().then(() => {
        this.loading = false;
      });
    },

    removeAlbum(id) {
      if (this.loadingDelete[id]) return;

      this.loadingDelete[id] = true;
      this.deleteAlbum(id).then(() => {
        this.loadAlbums().then(() => {
          this.loadingDelete[id] = false;
        });
      });
    },

    switchVisible(id, to) {
      if (this.loadingVisible[id]) return;

      this.loadingVisible[id] = true;

      const params = {
        hide: to,
      };

      this.editAlbum([id, params]).then(() => {
        this.loadAlbums().then(() => {
          this.loadingVisible[id] = false;
        });
      });
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
</style>