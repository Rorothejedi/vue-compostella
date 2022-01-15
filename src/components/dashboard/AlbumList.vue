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

          <div>Le {{ formatDate(album.date) }}</div>
        </router-link>
        <div>
          <switch-visibility-button :album="album" />
          <delete-button :album="album" />
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import date from "@/mixins/date.js";
import TitleLine from "@/components/utils/TitleLine.vue";
import SwitchVisibilityButton from "@/components/edit/SwitchVisibilityButton.vue";
import DeleteButton from "@/components/edit/DeleteButton.vue";

export default {
  name: "AlbumList",
  components: { TitleLine, SwitchVisibilityButton, DeleteButton },
  mixins: [date],

  data() {
    return {
      loading: false,
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
    ...mapActions("album", ["loadAlbums"]),

    fetchAlbums() {
      this.loading = true;
      this.loadAlbums().then(() => {
        this.loading = false;
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