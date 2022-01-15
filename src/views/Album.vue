<template>
  <div class="album">
    <div class="container">
      <div class="header">
        <router-link to="/" class="back">←</router-link>
        <Divider />
        <h2 class="places">
          {{ album.place_departure }} → {{ album.place_arrival }}
        </h2>
      </div>

      <br />
      <KilometersLine :loading="loading" :km="album.km_total" />
      <p class="story">
        {{ album.text }}
      </p>
      <Gallery :images="album.images" />
      <CommentList :comments="album.comments" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CommentList from "@/components/album/CommentList.vue";
import Gallery from "@/components/album/Gallery.vue";
import KilometersLine from "@/components/album/KilometersLine.vue";
import Divider from "@/components/utils/Divider.vue";

export default {
  name: "Album",
  components: { KilometersLine, Gallery, CommentList, Divider },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState("album", ["album"]),
  },

  mounted() {
    this.fetchAlbum();
  },

  unmounted() {
    this.clearAlbum();
  },

  methods: {
    ...mapActions("album", ["loadAlbum", "clearAlbum"]),

    fetchAlbum() {
      this.loading = true;
      this.loadAlbum(this.$route.params.id).then(() => {
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.back {
  text-decoration: none;
}
.places {
  font-family: var(--title-font-family-solid);
  font-weight: 400;
  font-size: 35px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.story {
  font-size: 17px;
  margin-top: 40px;
  margin-bottom: 40px;
  white-space: pre-wrap;
}
</style>
